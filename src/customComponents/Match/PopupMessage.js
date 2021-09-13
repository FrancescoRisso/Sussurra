/*

description:
	a popup saying a message
	
state:
	
props:
	- msg: the content of the message
	- secondMsg: (not necessary) the content of an eventual subtitle
	
functions:
	
imported into:
	- Match
	
dependences:
	- Settings
	
*/

import React from "react";
import Settings from "../../SettingsContext";

class PopupMessage extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`rounded-pill ${this.context.darkMode ? "dark" : "light"}`} id="playersturn">
				<p>{this.props.msg}</p>
				{this.props.secondMsg ? <small>{this.props.secondMsg}</small> : ""}
			</div>
		);
	}
}

export default PopupMessage;
