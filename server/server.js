// ------------------------------------------------
// IMPORTS
// ------------------------------------------------

const WebSocket = require("ws");
const moment = require("moment");
const express = require("express");
const http = require("http");
const _ = require("underscore");

// ------------------------------------------------
// FUNCTION DEFINITION
// ------------------------------------------------

const startGame = () => {
	// Prepare deck and starting player
	let deck = _.shuffle(cards);
	playersOrder = _.shuffle(Object.keys(players));

	log("START", `Starting game with players "${playersOrder.join('", "')}" (in order)`);

	matchInProgress = true;
	playerPlaying = playersOrder[0];
	playersDiscarded = playersOrder.map(() => 0);
	endingPlayer = "";

	// Notify that game will start
	Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "startGame" })));

	// Then send all the game information
	setTimeout(() => {
		Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "gameInfo", playersOrder, deck })));
	}, 1);
};

const playerReady = (name) => {
	log("READY", `'${name}' is ready`);
	ready[name] = true;
	Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "playerReady", name })));

	// If all players ready, start game
	if (Object.values(ready).filter((x) => !x).length == 0 && Object.values(ready).length > 1) startGame();
};

const playerNotReady = (name) => {
	log("READY", `'${name}' is not ready anymore`);
	ready[name] = false;
	Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "playerNotReady", name })));
};

const log = (type, message) => {
	console.log(
		`${moment().format("YYYY-MM-DD HH:mm:ss")}\t[LOG]\t[${type}]\t${type.length < 6 ? "\t" : ""}${message}`
	);
};

const login = (conn, msg) => {
	if (!Object.keys(players).includes(msg.name)) {
		//Name is ok
		log("REGISTER", `${conn._socket.remoteAddress} has name '${msg.name}'`);

		// rm connection from pending list
		loginPending.splice(loginPending.indexOf(conn), 1);

		//Notify all pending users
		loginPending.forEach((client) => client.send(JSON.stringify({ type: "newLogin", name: msg.name })));

		//Notify all logged users
		Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "newLogin", name: msg.name })));

		// add connection to players list
		players[msg.name] = conn;

		// Update ready player memory
		ready[msg.name] = false;

		// Notify player
		conn.send(JSON.stringify({ type: "loginAccepted" }));
		setTimeout(() => {
			conn.send(JSON.stringify({ type: "loggedPlayers", list: ready }));
		}, 1);

		return msg.name;
	} else {
		log("REGISTER", `${conn._socket.remoteAddress} wanted name '${msg.name}' but was already given`);

		//Name is already in use, notify user
		conn.send(JSON.stringify({ type: "Error", reason: "Name not free" }));
		return null;
	}
};

const playerDisconection = (name, conn) => {
	if (name !== null) {
		log("DISCONN", `'${name}' disconnected.`);

		if (matchInProgress) resetRoom();
		else {
			//Delete player from all lists
			delete players[name];
			delete ready[name];

			//Notify all users
			loginPending.forEach((client) => client.send(JSON.stringify({ type: "playerQuit", name })));
			Object.values(players).forEach((client) => client.send(JSON.stringify({ type: "playerQuit", name })));

			// If all players ready, start game
			if (Object.values(ready).filter((x) => !x).length == 0 && Object.values(ready).length > 1) startGame();
		}
	} else {
		log("DISCONN", `${conn._socket.remoteAddress} disconnected`);
		loginPending.splice(loginPending.indexOf(conn));
	}
};

const playerMove = (name, what, data) => {
	playerPlaying = playersOrder[(playersOrder.indexOf(playerPlaying) + 1) % playersOrder.length];

	switch (what) {
		case "discard":
			log("DECK-DISCARD", `${name} is discarding the deck's card`);
			Object.values(players).forEach((c) =>
				c.send(
					JSON.stringify({
						type: "playerMove",
						what: "discard",
						nowPlaying: playerPlaying,
						gameOver: endingPlayer === playerPlaying
					})
				)
			);
			break;
		case "playerSwitch":
			log(
				"PLAYER-SWITCH",
				`${name} is changing a card with another player ([${data[0].player}, ${data[0].card}] <=> [${data[1].player}, ${data[1].card}])`
			);
			Object.values(players).forEach((c) =>
				c.send(
					JSON.stringify({
						type: "playerMove",
						what: "playerSwitch",
						data,
						nowPlaying: playerPlaying,
						gameOver: endingPlayer === playerPlaying
					})
				)
			);
			break;
		case "deckSwitch":
			log("DECK-SWITCH", `${data.player} is switching their #${data.card} card with the one they drew out`);
			Object.values(players).forEach((c) =>
				c.send(
					JSON.stringify({
						type: "playerMove",
						what: "deckSwitch",
						data,
						nowPlaying: playerPlaying,
						gameOver: endingPlayer === playerPlaying
					})
				)
			);
			break;
	}
};

const cardDiscard = (player, card) => {
	log("HAND-DISCARD", `${player} discarded his card #${card}`);

	playersDiscarded[playersOrder.indexOf(player)]++;
	if (playersDiscarded[playersOrder.indexOf(player)] === 4) endingPlayer = player;
	console.log(player === endingPlayer && playerPlaying === player);

	Object.values(players).forEach((c) =>
		c.send(
			JSON.stringify({
				type: "cardDiscard",
				player,
				card,
				lastCard: endingPlayer !== "",
				gameOver: player === endingPlayer && playerPlaying === player
			})
		)
	);
};

const outOfCards = (name) => {
	log("FINISHING", `${name} ran out of cards, the game will finish soon`);
	Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "outOfCards", player: name })));
};

const saidStop = (name) => {
	log("FINISHING", `${name} said STOP, the game will finish soon`);
	Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "stop", player: name })));
};

const matchOver = () => {
	log("FINISHED", "Match is over. Clearing the game room");
	players = {};
	ready = {};
	matchInProgress = false;
	loginPending.forEach((client) => client.send(JSON.stringify({ type: "clearLoggedUsers" })));
	loginPending.forEach((client) => client.send(JSON.stringify({ type: "loginAllowed" })));
};

const reshuffle = (deck) => {
	log("RESHUFFLE", "Reshuffle deck");
	deck = _.shuffle(deck);
	Object.values(players).forEach((c) => c.send(JSON.stringify({ type: "reshuffle", deck })));
};

const resetRoom = () => {
	log("CLOSE", "closing the room");

	//Notify all pending users
	loginPending.forEach((client) => client.send(JSON.stringify({ type: "clearLoggedUsers" })));

	//Close connection to all logged users
	Object.values(players).forEach((c) => c.close());
	players = {};
	ready = {};

	matchInProgress = false;
};

// ------------------------------------------------
// CONSTANTS DEFINITION & SERVER STUFF
// ------------------------------------------------

const PORT = 1111;

const app = express();

// Card is a 2-char string: first char is the value (A, 2..9, 0 for 10, J, Q, K, G for Joker)
// Second char is the seed (italian): C-> cuori, Q-> quadri, F-> fiori, P-> picche; R-> rosso, N-> nero (Jokers)
const cards = [
	"AC",
	"AQ",
	"AF",
	"AP",
	"2C",
	"2Q",
	"2F",
	"2P",
	"3C",
	"3Q",
	"3F",
	"3P",
	"4C",
	"4Q",
	"4F",
	"4P",
	"5C",
	"5Q",
	"5F",
	"5P",
	"6C",
	"6Q",
	"6F",
	"6P",
	"7C",
	"7Q",
	"7F",
	"7P",
	"8C",
	"8Q",
	"8F",
	"8P",
	"9C",
	"9Q",
	"9F",
	"9P",
	"0C",
	"0Q",
	"0F",
	"0P",
	"JC",
	"JQ",
	"JF",
	"JP",
	"QC",
	"QQ",
	"QF",
	"QP",
	"KC",
	"KQ",
	"KF",
	"KP",
	"GR",
	"GN"
];
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

server.listen(PORT);
log("ONLINE", `Server is online on port ${PORT}`);

let players = {}; // { name: connection }
let ready = {}; // { name: start } whether the player said they are ready to start
let loginPending = []; // just list of connections

let playerPlaying = "";
let endingPlayer = "";
let playersOrder = [];
let playersDiscarded = [];

let matchInProgress = false;

// ------------------------------------------------
// SERVER BEHAVIOUR
// ------------------------------------------------

wss.on("connection", (conn) => {
	log("CONN", `${conn._socket.remoteAddress} is connecting`);

	// Add connection to the ones waitin for a nickname, and set nickname to null
	loginPending.push(conn);
	let name = null;

	// send the logged-in names to player
	conn.send(JSON.stringify({ type: "playersList", list: Object.keys(players) }));

	// If game is in progress, notify the user
	if (matchInProgress) conn.send(JSON.stringify({ type: "loginNotAllowed" }));

	conn.on("message", (data) => {
		let msg = JSON.parse(data);
		switch (msg.type) {
			case "login":
				name = login(conn, msg);
				break;

			case "ready":
				playerReady(name);
				break;

			case "notReady":
				playerNotReady(name);
				break;

			case "playerMove":
				playerMove(name, msg.what, msg.data);
				break;

			case "cardDiscard":
				cardDiscard(msg.player, msg.card);
				break;

			case "outOfCards":
				outOfCards(name);
				break;

			case "stop":
				saidStop(name);
				break;

			case "matchOver":
				matchOver();
				break;

			case "reshuffle":
				reshuffle(msg.deck);
				break;

			case "resetRoom":
				resetRoom();
				break;
		}
	});

	conn.on("close", () => {
		playerDisconection(name, conn);
	});
});
