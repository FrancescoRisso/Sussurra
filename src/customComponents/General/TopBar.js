/*

description:
	The bar on the top of the screen
	
state:
	
props:
	
functions:
	
imported into:
	- App
	
dependences:
	- TopBar.css
	- DropdownMenu
	- languagesList
	- sun.svg
	- Dictionary
	- Settings
	
*/

import React from "react";
import "./TopBar.css";
import DropdownMenu from "./DropdownMenu";
import languagesList from "../../languagesList";
import Sun from "../../images/sun-moon.svg";
import dict from "../../Dictionary";
import Settings from "../../SettingsContext";

class TopBar extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	languages = languagesList.map((item) => {
		return {
			code: item.code,
			name: item.image,
			tooltip: item.name,
			action: () => {
				this.context.changeLang(item.code);
			}
		};
	});

	render() {
		return (
			<header className={`col-12 row py-auto mx-0 ${this.context.darkMode ? "dark" : "light"}`}>
				{/* Language selector */}
				<div className="col-1 d-flex justify-content-center align-items-center">
					<DropdownMenu
						options={this.languages}
						type="img"
						selected={this.context.lang}
						css={`flag ${this.context.darkMode ? "flag-dark" : "flag-light"}`}
						tooltip={dict(this.context.lang, 0)}
						darkMode={this.context.darkMode}
					/>
				</div>

				{/* Main title */}
				<h1 className="col-10 text-center my-auto">Sussurra</h1>

				{/* Color theme choice */}
				<div className="col-1 d-flex justify-content-center align-items-center">
					<button
						className="btn btn-default"
						onClick={this.context.changeColorMode}
						title={dict(this.context.lang, this.context.darkMode ? 1 : 2)}
					>
						<img src={Sun} className="sun mr-auto" alt={dict(this.context.lang, 17)} />
					</button>
				</div>
			</header>
		);
	}
}

export default TopBar;
