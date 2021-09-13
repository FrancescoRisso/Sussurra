/*

description:
	The dictionary of the website
	Called with a language code and a number, returns the corresponding phrase in the right language
	
imported into:
	- LoginScreen
	- TopBar
	- HowToPlay
	- ConnClosed
	- Lobby
	- PlayerInLobby
	- Match
	- Results
	
*/

import it from "./langs/it";
import en from "./langs/en";

const texts = { it, en };

const get = (lang, word) => {
	return texts[lang][word];
};

export default get;
