/*

description:
	The main page for playing the game
	
state:
	- playerCards: array of the player cards. playerCards[0] is top-left player, then players continue in a clockwise way
		playerCards[n] is an array, containing the four cards (see PlayerCards.js for legend)
	- players: the list of player names in the order they are appearing
	- deck: the list of cards still in the deck
	- discarded: the list of discarded cards, where discarded[0] is the last discarded card
	- connClosed: if connection is closed this is set to true to redirect
	- playerPlaying: the name of the player currently playing
	- firstPlayer: the player who started first
	- playerPlayingVisible: whether to show the popup "playerPlaying now playing"
	- deckCardVisible: whether the card on top of the deck is visible
	- effectCard: whether last card was a particular card. Values can be "8", "9", "J", "J1", "Q", "Q1".
		J1 is when a J is discarded, and the first card to be switched has been chosen
		Q1 is when a Q is discarded, and the player has seen an opponent's card
	- selectedCard: if effectCard = "J1" or "Q1", the chosen card is stored here ( as { player, card } object)
	- lastPlayerToPlay: an { name, display, reason }-object to remember who the last player to play is
		name is its name, or null if not yet known
		display is whether the popup "game is about to finish" should be visible
		reason can be either "outOfCards" or "stop"
	- matchOver: whether the match is over
	- showResults: whether the results should be shown
	- hideResults: whether the results should be hidden
		showResults tells when it is time to show the results
		hideResults tells if the user wants to hide them
	- reshuffled: whether the deck has just been reshuffled
	
props:
	
functions:
	- 
	
imported into:
	- App
	
dependences:
	- Dictionary
	- Settings
	- Match.css
	- PlayerCards
	- Card
	- Redirect from react-router-dom
	- PopupMessage
	- Results
	
*/

import React from "react";
import Card from "./Card";
import dict from "../../Dictionary";
import Settings from "../../SettingsContext";
import "./Match.css";
import PlayerCards from "./PlayerCards";
import { Redirect } from "react-router-dom";
import PopupMessage from "./PopupMessage";
import Results from "./Results";

class Match extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
		const playerCards = [
			[
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false }
			],
			[
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false }
			],
			[
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false }
			],
			[
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false }
			],
			[
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false }
			],
			[
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false },
				{ card: "NN", visible: false }
			]
		];
		this.state = {
			playerCards,
			players: ["", "", "", "", "", ""],
			deck: [],
			discarded: [],
			connClosed: false,
			playerPlaying: "",
			firstPlayer: "",
			playerPlayingVisible: false,
			deckCardVisible: false,
			effectCard: "",
			selectedCard: {},
			lastPlayerToPlay: { name: null, display: false, reason: null },
			matchOver: false,
			showResults: false,
			hideResults: false,
			reshuffled: false
		};
	}

	cardValues = {
		A: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		0: 10,
		J: 11,
		Q: 12,
		G: 0,
		N: 0
	};

	cardScore = (card) => {
		if (card === "KF" || card === "KP") return 13;
		if (card === "KC" || card === "KQ") return -1;
		return this.cardValues[card.charAt(0)];
	};

	calcScore = (cards) => {
		return cards.reduce((sum, card) => sum + this.cardScore(card.card), 0);
	};

	componentDidMount = () => {
		this.context.websocket.onclose = () => {
			this.setState({ connClosed: true });
		};

		this.context.websocket.onmessage = (data) => {
			let msg = JSON.parse(data.data);

			switch (msg.type) {
				case "gameInfo":
					// game is starting
					let players = [...msg.playersOrder];
					let playerPositions = ["", "", "", "", "", ""];
					let startingPlayer = players[0];
					let cards = this.state.playerCards;
					let deck = msg.deck;
					const playersNumberPosition = {
						//if there are n players, they should be arranged in the player positions #playersNumberPosition[n]
						1: [4], //TODO TO BE REMOVED
						2: [1, 4],
						3: [0, 2, 4],
						4: [0, 1, 2, 4],
						5: [0, 2, 5, 4, 3],
						6: [0, 1, 2, 5, 4, 3]
					};

					// Arrange players so that "self" remains in the right position
					while (playersNumberPosition[players.length][players.indexOf(this.context.myName)] !== 4) {
						players.push(players.shift());
					}

					// Position player names
					players.forEach((p, i) => (playerPositions[playersNumberPosition[players.length][i]] = p));

					// Deal cards
					for (let cardNumber = 0; cardNumber < 4; cardNumber++) {
						msg.playersOrder.forEach((name) => {
							if (name !== "") cards[playerPositions.indexOf(name)][cardNumber].card = deck.shift();
						});
					}

					// Make two cards visible to the "self" player
					cards[4][2].visible = true;
					cards[4][3].visible = true;

					// Update screen
					this.setState(
						{
							players: playerPositions,
							playerPlaying: startingPlayer,
							firstPlayer: startingPlayer,
							playerCards: cards,
							deck,
							playerPlayingVisible: true
						},
						() => {
							setTimeout(() => this.setState({ playerPlayingVisible: false }), 1000);
						}
					);
					break;
				case "playerMove":
					this.setState(
						(state) => {
							switch (msg.what) {
								case "playerSwitch":
									// Switch the two players' cards
									[
										state.playerCards[state.players.indexOf(msg.data[0].player)][msg.data[0].card],
										state.playerCards[state.players.indexOf(msg.data[1].player)][msg.data[1].card]
									] = [
										state.playerCards[state.players.indexOf(msg.data[1].player)][msg.data[1].card],
										state.playerCards[state.players.indexOf(msg.data[0].player)][msg.data[0].card]
									];
									break;
								case "deckSwitch":
									// Switch player and deck's cards
									[
										state.playerCards[state.players.indexOf(msg.data.player)][msg.data.card].card,
										state.deck[0]
									] = [
										state.deck[0],
										state.playerCards[state.players.indexOf(msg.data.player)][msg.data.card].card
									];
									//Set correct visibility for the exchanged card
									if (this.context.myName === msg.data.player)
										state.playerCards[state.players.indexOf(msg.data.player)][
											msg.data.card
										].visible = true;
									else
										state.playerCards[state.players.indexOf(msg.data.player)][
											msg.data.card
										].visible = false;
									break;
								default:
									break;
							}
							// Update deck and discarded
							state.discarded.unshift(state.deck.shift());

							// Calculate next player to play
							const players = state.players.filter((x) => x !== "");
							const playerPlaying = players[(players.indexOf(state.playerPlaying) + 1) % players.length];

							// Check if match is over
							const matchOver =
								state.lastPlayerToPlay !== null && playerPlaying === state.lastPlayerToPlay.name;

							// Check if deck is empty
							if (state.deck.length === 0 && this.context.myName === state.firstPlayer)
								this.context.websocket.send(
									JSON.stringify({ type: "reshuffle", deck: state.discarded.slice(1) })
								);
							return {
								discarded: state.discarded,
								deck: state.deck,
								deckCardVisible: false,
								playerPlaying,
								playerPlayingVisible: true,
								playerCards: state.playerCards,
								matchOver
							};
						},
						() => {
							// Remove "Player's turn" or "Game over" popup
							setTimeout(
								() => {
									// Remove popup
									this.setState({ playerPlayingVisible: false, reshuffled: false }, () => {
										// Then if match is over notify server and display results after 2sec
										if (this.state.matchOver)
											setTimeout(() => {
												if (this.state.firstPlayer === this.context.myName)
													this.context.websocket.send(JSON.stringify({ type: "matchOver" }));
												this.setState((state) => {
													// Make all cards visible
													state.playerCards = state.playerCards.map((player) =>
														player.map((card) => {
															return { card: card.card, visible: true };
														})
													);
													return { showResults: true, playerCards: state.playerCards };
												});
											}, 2000);
									});
								},
								this.state.matchOver ? 2000 : 1000
							);
						}
					);
					break;
				case "cardDiscard":
					this.setState(
						(state) => {
							state.discarded.unshift(
								state.playerCards[state.players.indexOf(msg.player)][msg.card].card
							);
							state.playerCards[state.players.indexOf(msg.player)][msg.card].card = "NN";
							return { playerCards: state.playerCards };
						},
						() => {
							if (this.state.playerCards[4].filter((x) => x.card !== "NN").length === 0) {
								this.context.websocket.send(
									JSON.stringify({ type: "outOfCards", player: this.state.players[4] })
								);
							}
						}
					);
					break;
				case "outOfCards":
					this.setState(
						{
							lastPlayerToPlay: {
								name: msg.player,
								visible: true,
								reason: "outOfCards",
								self: msg.player === this.context.myName
							}
						},
						() => {
							setTimeout(() => {
								this.setState((state) => {
									state.lastPlayerToPlay.visible = false;
									return { lastPlayerToPlay: state.lastPlayerToPlay };
								});
							}, 2000);
						}
					);
					break;
				case "stop":
					this.setState(
						{
							lastPlayerToPlay: {
								name: msg.player,
								visible: true,
								reason: "stop",
								self: msg.player === this.context.myName
							}
						},
						() => {
							setTimeout(() => {
								this.setState((state) => {
									state.lastPlayerToPlay.visible = false;
									return { lastPlayerToPlay: state.lastPlayerToPlay };
								});
							}, 2000);
						}
					);
					break;
				case "reshuffle":
					this.setState((state) => {
						return { deck: msg.deck, discarded: [state.discarded[0]], reshuffled: true };
					});
					break;
				default:
					break;
			}
		};
	};

	actions = {
		deck: {
			evalCondition: () => {
				return (
					this.state.playerPlaying === this.context.myName &&
					!this.state.deckCardVisible &&
					this.state.effectCard === "" &&
					this.state.deck.length !== 0 &&
					!this.state.showResults
				);
			},
			action: () => {
				if (this.actions.deck.evalCondition()) this.setState({ deckCardVisible: true });
			}
		},
		discard: {
			evalCondition: () => {
				return (
					!this.state.showResults &&
					this.state.playerPlaying === this.context.myName &&
					this.state.deckCardVisible &&
					this.state.effectCard === ""
				);
			},
			action: () => {
				if (this.actions.discard.evalCondition()) {
					if (["8", "9", "J", "Q"].includes(this.state.deck[0].charAt(0))) {
						if (
							(this.state.deck[0].charAt(0) === "8" &&
								this.state.playerCards[4].filter((x) => !x.visible).length === 0) ||
							(this.state.deck[0].charAt(0) === "9" &&
								this.state.playerCards
									.filter((c, i) => i !== 4)
									.flat()
									.filter((x) => !x.visible && x.card !== "NN").length === 0)
						)
							this.context.websocket.send(JSON.stringify({ type: "playerMove", what: "discard" }));
						else
							this.setState((state) => {
								return {
									effectCard: state.deck[0].charAt(0),
									deckCardVisible: false,
									discarded: [state.deck[0], ...state.discarded]
								};
							});
					} else this.context.websocket.send(JSON.stringify({ type: "playerMove", what: "discard" }));
				}
			}
		},
		card: {
			evalCondition: (player, card) => {
				return (
					!this.state.showResults && // La partita è in corso
					// Scartato un 8
					((this.state.playerPlaying === this.context.myName && // Tocca a me
						player === 4 && // La carta è mia
						this.state.effectCard === "8" && // Ho scartato un 8
						!this.state.playerCards[player][card].visible && // La carta selezionata è coperta
						this.state.playerCards[player][card].card !== "NN") || // La carta selezionata è una vera carta
						// Scartato un 9
						(this.state.playerPlaying === this.context.myName && // Tocca a me
							player !== 4 && // La carta è altrui
							this.state.effectCard === "9" && // Ho scartato un 9
							!this.state.playerCards[player][card].visible && // La carta selezionata è coperta
							this.state.playerCards[player][card].card !== "NN") || // La carta selezionata è una vera carta
						// Scartato un J
						(this.state.playerPlaying === this.context.myName && // Tocca a me
							this.state.effectCard === "J" && // Ho scartato un J
							this.state.playerCards[player][card].card !== "NN") || // La carta selezionata è una vera carta
						// Scartato un J e selezionato la prima carta
						(this.state.playerPlaying === this.context.myName && // Tocca a me
							this.state.effectCard === "J1" && // Ho scartato un J e selezionato la prima carta
							this.state.playerCards[player][card].card !== "NN" && // La carta selezionata è una vera carta
							((this.state.selectedCard.player === 4 && player !== 4) || // Ho già selezionato una mia carta, e questa è altrui, oppure
								(this.state.selectedCard.player !== 4 && player === 4))) || // Ho già selezionato una carta altrui, e questa è mia
						// Scartato un Q
						(this.state.playerPlaying === this.context.myName && // Tocca a me
							player !== 4 && // La carta è altrui
							this.state.effectCard === "Q" && // Ho scartato un Q
							this.state.playerCards[player][card].card !== "NN") || // La carta selezionata è una vera carta
						// Scartato un Q e selezionato la prima carta
						(this.state.playerPlaying === this.context.myName && // Tocca a me
							player === 4 && // La carta è mia
							this.state.effectCard === "Q1" && // Ho scartato un Q e visto una carta avversaria
							this.state.playerCards[player][card].card !== "NN") || // La carta selezionata è una vera carta
						// Scarto una carta da in mano
						(this.state.discarded.length > 0 && // Ci sono carte scartate
							this.state.playerCards[player][card].card.charAt(0) === this.state.discarded[0].charAt(0) && // La carta selezionata ha lo stesso numero dell'ultima scartata
							this.state.playerCards[player][card].visible && // La carta selezionata è visibile
							(this.state.playerPlaying !== this.context.myName || // Non tocca a me, oppure
								(this.state.playerPlaying === this.context.myName && !this.state.deckCardVisible)) && // Tocca a me, ma non ho ancora pescato
							this.state.effectCard === "" && // Non ho scartato carte particolari
							player === 4) || // La carta è mia
						// Scambio la carta pescata con una mia
						(this.state.playerPlaying === this.context.myName && // Tocca a me
							player === 4 && // La carta è mia
							this.state.deckCardVisible && // Ho pescato
							this.state.playerCards[player][card].card !== "NN")) // La carta selezionata è una vera carta
				);
			},
			action: (player, card) => {
				if (this.actions.card.evalCondition(player, card)) {
					// If card can be pressed, check if a special card has been discarded
					switch (this.state.effectCard) {
						// Look at one of your cards
						case "8":
							//If not already visible, make it visible
							this.setState(
								(state) => {
									state.playerCards[player][card].visible = true;
									state.discarded.shift();
									return {
										effectCard: "",
										playerCards: state.playerCards,
										discarded: state.discarded
									};
								},
								//Notify other users
								() => {
									this.context.websocket.send(
										JSON.stringify({ type: "playerMove", what: "discard" })
									);
								}
							);
							break;
						case "9":
							//If not already visible, make it visible
							this.setState(
								(state) => {
									state.playerCards[player][card].visible = true;
									state.discarded.shift();
									return {
										effectCard: "",
										playerCards: state.playerCards,
										discarded: state.discarded
									};
								},
								//Notify other users
								() => {
									this.context.websocket.send(
										JSON.stringify({ type: "playerMove", what: "discard" })
									);
								}
							);
							break;
						case "J":
							// Set as chosen card
							this.setState({ effectCard: "J1", selectedCard: { player, card } });
							break;
						case "J1":
							this.setState(
								(state) => {
									state.discarded.shift();
									return {
										effectCard: "",
										discarded: state.discarded
									};
								},
								//Notify other users
								() => {
									this.context.websocket.send(
										JSON.stringify({
											type: "playerMove",
											what: "playerSwitch",
											data: [
												{ player: this.state.players[player], card },
												{
													player: this.state.players[this.state.selectedCard.player],
													card: this.state.selectedCard.card
												}
											]
										})
									);
								}
							);
							break;
						case "Q":
							// Make the card visible and set it as selected
							this.setState((state) => {
								state.playerCards[player][card].visible = true;
								return {
									effectCard: "Q1",
									playerCards: state.playerCards,
									selectedCard: { player, card }
								};
							});
							break;
						case "Q1":
							// Switch the cards
							this.setState(
								(state) => {
									state.discarded.shift();
									return {
										effectCard: "",
										discarded: state.discarded
									};
								},
								//Notify other users
								() => {
									this.context.websocket.send(
										JSON.stringify({
											type: "playerMove",
											what: "playerSwitch",
											data: [
												{ player: this.context.myName, card },
												{
													player: this.state.players[this.state.selectedCard.player],
													card: this.state.selectedCard.card
												}
											]
										})
									);
								}
							);
							break;
						default:
							if (this.state.deckCardVisible) {
								this.context.websocket.send(
									JSON.stringify({
										type: "playerMove",
										what: "deckSwitch",
										data: { player: this.context.myName, card }
									})
								);
							} else {
								this.context.websocket.send(
									JSON.stringify({ type: "cardDiscard", player: this.state.players[player], card })
								);
							}
							break;
					}
				}
			}
		},
		ignoreCardAction: {
			action: () => {
				this.setState(
					(state) => {
						state.discarded.shift();
						return { discarded: state.discarded, effectCard: "", selectedCard: {} };
					},
					//Notify other users
					() => {
						this.context.websocket.send(JSON.stringify({ type: "playerMove", what: "discard" }));
					}
				);
			}
		},
		stopButton: {
			evalCondition: () => {
				return this.state.playerPlaying === this.context.myName && this.state.lastPlayerToPlay.name === null;
			},
			action: () => {
				if (this.actions.stopButton.evalCondition())
					this.context.websocket.send(JSON.stringify({ type: "stop" }));
			}
		}
	};

	render() {
		if (this.state.connClosed) return <Redirect to="/connClosed" push />;
		return (
			<div id="match">
				{this.state.showResults && !this.state.hideResults ? (
					<Results
						scores={this.state.players.map((name, index) => [
							name,
							this.calcScore(this.state.playerCards[index])
						])}
					/>
				) : (
					""
				)}
				{this.state.playerPlayingVisible ? (
					this.state.matchOver ? (
						<PopupMessage msg={dict(this.context.lang, 45)} />
					) : (
						<PopupMessage
							msg={`${dict(this.context.lang, 34)} ${this.state.playerPlaying}`}
							secondMsg={this.state.reshuffled ? dict(this.context.lang, 64) : null}
						/>
					)
				) : (
					""
				)}
				{this.state.lastPlayerToPlay.visible ? (
					<PopupMessage
						msg={
							this.state.lastPlayerToPlay.reason === "outOfCards"
								? `${
										this.state.lastPlayerToPlay.self
											? `${dict(this.context.lang, 28)} ${dict(this.context.lang, 40)}`
											: `${this.state.lastPlayerToPlay.name} ${dict(this.context.lang, 39)}`
								  } ${dict(this.context.lang, 41)} ${dict(
										this.context.lang,
										this.state.lastPlayerToPlay.self ? 42 : 43
								  )}`
								: `${
										this.state.lastPlayerToPlay.self
											? `${dict(this.context.lang, 28)} ${dict(this.context.lang, 40)}`
											: `${this.state.lastPlayerToPlay.name} ${dict(this.context.lang, 39)}`
								  } ${dict(this.context.lang, 44)} ${dict(
										this.context.lang,
										this.state.lastPlayerToPlay.self ? 42 : 43
								  )}`
						}
					/>
				) : (
					""
				)}
				{this.state.effectCard !== "" ? (
					<div className="tips">
						<p>
							{dict(
								this.context.lang,
								this.state.effectCard === "8"
									? 35
									: this.state.effectCard === "9"
									? 36
									: this.state.effectCard === "J"
									? 37
									: this.state.effectCard === "Q"
									? 38
									: this.state.effectCard === "Q1" || this.state.selectedCard.player !== 4
									? 62
									: 63
							)}
							<button
								className={`btn btn-${this.context.darkMode ? "secondary" : "info"} rounded-pill `}
								onClick={this.actions.ignoreCardAction.action}
							>
								{dict(this.context.lang, 22)}
							</button>
						</p>
					</div>
				) : (
					""
				)}

				{/* Stop button and hid results button */}
				{this.state.showResults ? (
					<button
						className={`stop btn btn-${this.context.darkMode ? "secondary" : "info"} rounded-pill`}
						onClick={() => {
							this.setState((state) => {
								return { hideResults: !state.hideResults };
							});
						}}
					>
						{dict(this.context.lang, this.state.hideResults ? 51 : 52)}
					</button>
				) : (
					<button
						className={`stop btn btn-${this.context.darkMode ? "secondary" : "info"} rounded-pill ${
							this.actions.stopButton.evalCondition() ? "enabled" : "disabled"
						}`}
						onClick={this.actions.stopButton.action}
					>
						STOP
					</button>
				)}

				{/* Little thing to remember who is playing */}
				{this.state.playerPlaying !== this.context.myName ? (
					<div className={`nowPlaying rounded-pill ${this.context.darkMode ? "dark" : "light"}`}>
						<p>{`${dict(this.context.lang, 34)} ${this.state.playerPlaying}`}</p>
					</div>
				) : (
					""
				)}
				<div className="carpet">
					{this.state.playerCards.map((player, index) => {
						return (
							<PlayerCards
								key={index}
								position={`pos-${index}`}
								cards={player}
								self={false}
								name={`${this.state.players[index]}${
									index === 4 ? ` (${dict(this.context.lang, 28)})` : ""
								}`}
								cardClickEvent={(card) => {
									this.actions.card.action(index, card);
								}}
								cardClickable={(card) => {
									return this.actions.card.evalCondition(index, card);
								}}
							/>
						);
					})}
					<div className="deck">
						<Card
							card={
								this.state.deck.length === 0
									? { card: "NN" }
									: { card: this.state.deck[0], visible: this.state.deckCardVisible }
							}
							clickEvent={this.actions.deck.action}
							clickable={this.actions.deck.evalCondition()}
						/>
					</div>
					<div className="discard">
						<Card
							card={
								this.state.discarded.length === 0
									? { card: "NN" }
									: { card: this.state.discarded[0], visible: true }
							}
							clickable={this.actions.discard.evalCondition()}
							clickEvent={this.actions.discard.action}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Match;
