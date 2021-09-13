/*

description:
	Button to open a menu to describe how to play the game
	
state:
	
props:
	
functions:
	
imported into:
	- App
	
dependences:
	- Dictionary
	- SettingsContext
	- HowToPlay.css
	- positioning.svg
	
*/

import React from "react";
import dict from "../../Dictionary";
import Settings from "../../SettingsContext";
import "./HowToPlay.css";
import Positioning from "../../images/Cards/positioning.svg";

class HowToPlay extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`howTo ${this.context.darkMode ? "dark" : "light"}`}>
				<div className="modal fade" id="howToPlay">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h5>{dict(this.context.lang, 3)}</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<h3>{dict(this.context.lang, 61)}</h3>
								<p>{dict(this.context.lang, 4)}</p>
								<div className="row px-3 ml-3">
									<ul className="col-4">
										<li>Jolly {String.fromCharCode(8594)} 0 pt</li>
										<li>A {String.fromCharCode(8594)} 1 pt</li>
										<li>2 {String.fromCharCode(8594)} 2 pt</li>
										<li>3 {String.fromCharCode(8594)} 3 pt</li>
										<li>4 {String.fromCharCode(8594)} 4 pt</li>
									</ul>
									<ul className="col-4">
										<li>5 {String.fromCharCode(8594)} 5 pt</li>
										<li>6 {String.fromCharCode(8594)} 6 pt</li>
										<li>7 {String.fromCharCode(8594)} 7 pt</li>
										<li>8 {String.fromCharCode(8594)} 8 pt</li>
										<li>9 {String.fromCharCode(8594)} 9 pt</li>
									</ul>
									<ul className="col-4">
										<li>10 {String.fromCharCode(8594)} 10 pt</li>
										<li>J {String.fromCharCode(8594)} 11 pt</li>
										<li>Q {String.fromCharCode(8594)} 12 pt</li>
										<li>
											K ({String.fromCharCode(9824)}, {String.fromCharCode(9827)}){" "}
											{String.fromCharCode(8594)} 13 pt
										</li>
										<li>
											K ({String.fromCharCode(9830)}, {String.fromCharCode(9829)}){" "}
											{String.fromCharCode(8594)} -1 pt
										</li>
									</ul>
								</div>
								<div className="row mx-0 mb-3">
									<div className="col-9 p-0">
										<p className="p-0">{dict(this.context.lang, 5)}</p>
										<p className="p-0 mb-0">{dict(this.context.lang, 6)}</p>
									</div>
									<div className="col-3 d-flex align-items-center pr-2" width="100%">
										<img src={Positioning} width="100%" alt={dict(this.context.lang, 16)} />
									</div>
								</div>
								<p className="example">{dict(this.context.lang, 66)}</p>
								<p>{dict(this.context.lang, 7)}</p>
								<p>{dict(this.context.lang, 8)}</p>
								<p className="example">{dict(this.context.lang, 67)}</p>
								<p>{dict(this.context.lang, 9)}</p>
								<ul>
									<li>
										8 {String.fromCharCode(8594)} {dict(this.context.lang, 10)}
									</li>
									<li>
										9 {String.fromCharCode(8594)} {dict(this.context.lang, 11)}
									</li>
									<li>
										J {String.fromCharCode(8594)} {dict(this.context.lang, 12)}
									</li>
									<li>
										Q {String.fromCharCode(8594)} {dict(this.context.lang, 13)}
									</li>
								</ul>
								<p>{dict(this.context.lang, 14)}</p>
								<hr className="my-5" />
								<h3>{dict(this.context.lang, 60)}</h3>
								<p>{dict(this.context.lang, 53)}</p>
								<p>{dict(this.context.lang, 54)}</p>
								<p>{dict(this.context.lang, 55)}</p>
								<p>{dict(this.context.lang, 56)}</p>
								<p>{dict(this.context.lang, 57)}</p>
								<p>{dict(this.context.lang, 58)}</p>
								<p>{dict(this.context.lang, 59)}</p>
								<p>{dict(this.context.lang, 68)}</p>
							</div>
							<div className="modal-footer">
								<button
									className={`btn btn-${this.context.darkMode ? "secondary" : "info"} rounded-pill`}
									data-dismiss="modal"
								>
									{dict(this.context.lang, 15)}
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="bottom d-flex justify-content-end container">
					<button
						className={`btn rounded-pill mr-3 ${this.context.darkMode ? "btn-secondary" : "btn-info"}`}
						data-toggle="modal"
						data-target="#howToPlay"
					>
						{dict(this.context.lang, 3)}
					</button>
				</div>
			</div>
		);
	}
}

export default HowToPlay;
