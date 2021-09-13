/*

description:
	The context containing the selected language and theme, and functions to update them
	
imported into:
	- App
	- TopBar
	- HowToPlay
	- LoginScreen
	- ConnClosed
	- Lobby
	- PlayerInLobby
	- Match
	- Card
	- PopupMessage
	- Results
	
*/

import React from "react";

export default React.createContext({ lang: "it", darkMode: false });
