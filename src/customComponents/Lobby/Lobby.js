/*

description:
	The lobby for the logged players waiting for the game to start
	
state:
	- playersReady: list of {name: "", ready: bool} players
	- ready: whether the player is ready
	- connClosed: if connection is closed this is set to true to redirect
	- startGame: if game starts this is set to true to redirect
	
props:
	- 
	
functions:
	- 
	
imported into:
	- App
	
dependences:
	- Dictionary
	- Settings
	- PlayerInLobby
	- Lobby.css
	
*/

import React from "react";
import dict from "../../Dictionary";
import Settings from "../../SettingsContext";
import PlayerInLobby from "./PlayerInLobby";
import "./Lobby.css";
import { Redirect } from "react-router-dom";

class Lobby extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
		this.state = { playersReady: [], ready: false, connClosed: false, startGame: false };
	}

	componentDidMount() {
		this.context.websocket.onclose = () => {
			this.setState({ connClosed: true });
		};

		this.context.websocket.onmessage = (data) => {
			let msg = JSON.parse(data.data);

			switch (msg.type) {
				case "loggedPlayers":
					this.setState({
						playersReady: Object.entries(msg.list)
							.filter((p) => p[0] !== this.context.myName)
							.map((player) => {
								return { name: player[0], ready: player[1] };
							})
					});
					break;

				case "playerReady":
					this.setState((state) => {
						return {
							playersReady: state.playersReady.map((p) => {
								if (p.name === msg.name) return { name: p.name, ready: true };
								return p;
							})
						};
					});
					break;

				case "playerNotReady":
					this.setState((state) => {
						return {
							playersReady: state.playersReady.map((p) => {
								if (p.name === msg.name) return { name: p.name, ready: false };
								return p;
							})
						};
					});
					break;

				case "newLogin":
					if (msg.name !== this.context.myName)
						this.setState((state) => {
							return { playersReady: [...state.playersReady, { name: msg.name, ready: false }] };
						});
					break;

				case "playerQuit":
					this.setState((state) => {
						return { playersReady: state.playersReady.filter((p) => p.name !== msg.name) };
					});
					break;

				case "startGame":
					this.setState({ startGame: true });
					break;

				default:
					break;
			}
		};
	}

	render() {
		if (this.state.connClosed) return <Redirect to="/connClosed" />;
		if (this.state.startGame) return <Redirect to="/match" />;
		if (this.context.myName === "") return <Redirect to="/error" />;
		return (
			<div className="lobby">
				<p className="text-center big">{dict(this.context.lang, 31)}</p>
				<div className="d-flex justify-content-center">
					<button
						className={`btn btn-${this.context.darkMode ? "secondary" : "info"} rounded-pill big`}
						onClick={() => {
							this.setState((state) => {
								if (state.ready) {
									this.context.websocket.send(JSON.stringify({ type: "notReady" }));
									return { ready: false };
								} else {
									this.context.websocket.send(JSON.stringify({ type: "ready" }));
									return { ready: true };
								}
							});
						}}
					>
						{dict(this.context.lang, this.state.ready ? 33 : 32)}
					</button>
				</div>
				<div className="my-auto">
					<PlayerInLobby
						nickname={`${this.context.myName} (${dict(this.context.lang, 28)})`}
						ready={this.state.ready}
					/>
					{this.state.playersReady.map((p) => (
						<PlayerInLobby nickname={p.name} ready={p.ready} key={p.name} />
					))}
				</div>
			</div>
		);
	}
}

export default Lobby;
