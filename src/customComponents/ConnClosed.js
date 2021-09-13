/*

description:
	Whenever the connection to the server is closed while in the login page, this is where the user is sent
	
state:
	
props:
	
functions:
	
imported into:
	- App
	
dependences:
	- Dictionary
	- Settings
	- LoginScreen.css
	- Link from react-router-dom
	
*/

import React from "react";
import dict from "../Dictionary";
import Settings from "./../SettingsContext";
import "./LoginScreen.css";
import { Link } from "react-router-dom";

class ConnClosed extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<div className="login">
					<div className="placeHolder height-30"></div>
					<div className="d-flex justify-content-center">
						<small className="text-center mb-3">{dict(this.context.lang, 21)}</small>
					</div>
					<div className="d-flex justify-content-center">
						<Link to="/login">
							<button
								className={`btn backToLoginButton rounded-pill mx-auto btn-${
									this.context.darkMode ? "secondary" : "info"
								}`}
								onClick={this.context.reloadConn}
							>
								{dict(this.context.lang, 22)}
							</button>
						</Link>
					</div>
					<div className="d-flex justify-content-center">
						<small className="text-center mb-3">{dict(this.context.lang, 23)}</small>
					</div>
					<p className="text-center"><i>{dict(this.context.lang, 24)}</i></p>
				</div>
			</>
		);
	}
}

export default ConnClosed;
