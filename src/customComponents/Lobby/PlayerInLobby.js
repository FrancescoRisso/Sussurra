/*

description:
	Displays a player while in the lobby
	
state:
	
props:
	- nickname: the nickname of the player
	- ready: whether the player is ready to start playing
	
functions:
	
imported into:
	- Lobby
	
dependences:
	- Dictionary
	- Settings
	- man-icon.svg & man-icon-tick.svg
	
*/

import React from "react";
import Settings from "../../SettingsContext";
import dict from "../../Dictionary";
import PersonIcon from "../../images/man-icon.svg";
import PersonIconTick from "../../images/man-icon-tick.svg";

class PlayerInLobby extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="row mx-0">
				<div className="col-2 py-4 px-lg-4 px-xl-5 px-2">
					<img
						src={this.props.ready ? PersonIconTick : PersonIcon}
						alt={dict(this.context.lang, this.props.ready ? 29 : 30)}
						width="100%"
					></img>
				</div>
				<div className="col-10 center">
					<p className="nickname">{this.props.nickname}</p>
				</div>
			</div>
		);
	}
}

export default PlayerInLobby;
