/*

description:
	The main file, containing the router switch
	
state:
	- lang: the code of the language to be displayed
	- darkMode: whether the website should be displayed with dark mode
	- websocket: the connection to the server
	- myName: the nickname of the player
	
props:
	
functions:
	- changeLang(lang): allows the language to be changed to lang
	- changeColorMode: alternates between dark theme and light theme
	- websocket: the websocket connection

dependences:
	- App.css
	- React-router-dom
	- LoginScreen
	- TopBar
	- Settings
	- HowToPlay
	- Error
	- Lobby
	- Match
	- ResetRoom

*/

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from "./customComponents/LoginScreen";
import TopBar from "./customComponents/General/TopBar";
import Settings from "./SettingsContext";
import HowToPlay from "./customComponents/General/HowToPlay";
import Error from "./customComponents/General/Error";
import Lobby from "./customComponents/Lobby/Lobby";
import { connection, w3cwebsocket } from "websocket";
import Match from "./customComponents/Match/Match";
import ResetRoom from "./customComponents/ResetRoom";

console.log(window.Config);
const websocketAddress = window.ENV.webSocketAddress;

class App extends React.Component {
	constructor(props) {
		super(props);
		document.body.style.backgroundColor = "#f8f9fa";
		this.state = {
			lang: "it",
			darkMode: false,
			websocket: new w3cwebsocket(websocketAddress),
			myName: ""
		};
	}

	changeLang = (lang) => {
		console.log(lang);
		this.setState({ lang });
	};

	changeColorMode = () => {
		this.setState((state) => {
			if (state.darkMode) {
				document.body.style.backgroundColor = "#f8f9fa";
				return { darkMode: false };
			}
			document.body.style.backgroundColor = "#212121";
			return { darkMode: true };
		});
	};

	render() {
		return (
			<Settings.Provider
				value={{
					lang: this.state.lang,
					darkMode: this.state.darkMode,
					changeColorMode: this.changeColorMode,
					changeLang: this.changeLang,
					websocket: this.state.websocket,
					reloadConn: () => {
						this.setState({ websocket: new w3cwebsocket(websocketAddress) });
					},
					myName: this.state.myName,
					setName: (name) => {
						this.setState({ myName: name });
					}
				}}
			>
				<Router>
					<div className={`App container ${this.state.darkMode ? "dark-theme" : "light-theme"}`}>
						<TopBar />
						<HowToPlay />
						<Switch>
							<Route exact path="/">
								<Redirect to="/login" />
							</Route>

							<Route path="/login">
								<LoginScreen />
							</Route>

							<Route path="/lobby">
								<Lobby />
							</Route>

							<Route path="/connClosed">
								<Error reason="connClosed" />
							</Route>

							<Route path="/error">
								<Error reason="general" />
							</Route>

							<Route path="/match">
								<Match />
							</Route>

							<Route path="/resetRoom">
								<ResetRoom />
							</Route>

							<Route >
								<Redirect to="/login" />
							</Route>
						</Switch>
					</div>
				</Router>
			</Settings.Provider>
		);
	}
}

export default App;
