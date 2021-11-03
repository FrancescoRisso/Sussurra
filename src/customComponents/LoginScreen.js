/*

description:
	The login screen
	
state:
	- nickname: the nickname the user has inserted
	- namesList: the list of used nicknames
	- goToLobby: set to true when login is successful, so the user should be redirected
	- connClosed: set to true when connection to server is closed, so the user should be redirected
	- loginAllowed: whether the login is allowed (thus no match is being played)
	
props:
	- 
	
functions:
	- sendName: send the current nickname to the server
	
imported into:
	- App
	
dependences:
	- Dictionary
	- Settings
	- LoginScreen.css
	
*/

import React from "react";
import dict from "../Dictionary";
import Settings from "./../SettingsContext";
import "./LoginScreen.css";
import { Redirect } from "react-router-dom";

class LoginScreen extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
		this.state = { nickname: "", namesList: [], goToLobby: false, connClosed: false, loginAllowed: true };
	}

	componentDidMount() {
		this.context.websocket.onopen = () => {
			console.log("Connected to server");
		};

		this.context.websocket.onclose = () => {
			this.setState({ connClosed: true });
		};

		this.context.websocket.onmessage = (data) => {
			let msg = JSON.parse(data.data);
			switch (msg.type) {
				case "playersList":
					this.setState({ namesList: msg.list });
					break;

				case "clearLoggedUsers":
					this.setState({ namesList: "" });
					break;

				case "newLogin":
					this.setState((state) => {
						return { namesList: [...state.namesList, msg.name] };
					});
					break;

				case "playerQuit":
					this.setState((state) => {
						return { namesList: state.namesList.filter((p) => p.name !== msg.name) };
					});
					break;

				case "loginAccepted":
					this.context.setName(this.state.nickname);
					this.setState({ goToLobby: true });
					break;

				case "Error":
					if (msg.reason === "Name not free") {
						const input = document.getElementById("nickname-input");
						input.setCustomValidity(
							`${dict(this.context.lang, 26)} "${this.state.nickname}" ${dict(this.context.lang, 27)}`
						);
						input.reportValidity();
					}
					break;

				case "loginNotAllowed":
					this.setState({ loginAllowed: false });
					break;

				case "loginAllowed":
					this.setState({ loginAllowed: true });
					break;

				default:
					break;
			}
		};

		this.setState({ nickname: this.context.myName });
	}

	sendName = (event) => {
		event.preventDefault();
		const input = document.getElementById("nickname-input");
		input.setCustomValidity("");
		if (this.state.nickname === "") input.setCustomValidity(dict(this.context.lang, 25));
		else if (this.state.namesList.length >= 6) input.setCustomValidity(dict(this.context.lang, 65));
		else if (!this.state.loginAllowed) input.setCustomValidity(dict(this.context.lang, 69));
		else this.context.websocket.send(JSON.stringify({ type: "login", name: this.state.nickname }));
		input.reportValidity();
	};

	render() {
		if (this.state.goToLobby) return <Redirect to="/lobby" />;
		if (this.state.connClosed) return <Redirect to="/connClosed" />;
		return (
			<div className="login">
				<div className="placeHolder height-20"></div>
				<form className="my-auto height-20">
					<div>
						<label className="text-center mb-4">{dict(this.context.lang, 18)}</label>
					</div>
					<div className="d-flex justify-content-center">
						<input
							type="text"
							id="nickname-input"
							className={`text-center rounded-pill ${this.context.darkMode ? "dark" : "light"}`}
							onChange={(event) => {
								document.getElementById("nickname-input").setCustomValidity("");
								this.setState({ nickname: event.target.value });
							}}
							required={true}
							value={this.state.nickname}
						/>
					</div>
					<div className="d-flex justify-content-center mt-2">
						<button
							className={`btn loginButton rounded-pill mx-auto btn-${
								this.context.darkMode ? "secondary" : "info"
							}`}
							onClick={this.sendName}
						>
							{dict(this.context.lang, 20)}
						</button>
					</div>
				</form>
				<div className="placeHolder height-20"></div>
				<div className="height-20">
					<div className="d-flex justify-content-center">
						<small className="text-center mb-3">{dict(this.context.lang, 19)}</small>
					</div>
					<div className="d-flex justify-content-center">
						<i className="text-center big">
							{this.state.namesList.length === 0 ? "-" : this.state.namesList.join(", ")}
						</i>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginScreen;
