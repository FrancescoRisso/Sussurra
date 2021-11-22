/*

description:
	Sends the server a command to reset the room
	
state:
	
props:
	
functions:
	
imported into:
	- App
	
dependences:
	- Settings
	- react-router-dom
	
*/

import React from "react";
import { Redirect } from "react-router";
import Settings from "../SettingsContext";

class ResetRoom extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	componentDidMount = ()=>{
		setTimeout(()=>{this.context.websocket.send(JSON.stringify({type: "resetRoom"}));}, 1000) ;
	}

	render() {
		return <Redirect to="/connClosed" />;
	}
}

export default ResetRoom;
