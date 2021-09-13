/*

description:
	
	
state:
	- scores
	
props:
	- 
	
functions:
	- 
	
imported into:
	- Match
	
dependences:
	- Settings
	- Dictionary
	- Link from react-router-dom
	
*/

import React from "react";
import Settings from "../../SettingsContext";
import dict from "../../Dictionary";
import { Link } from "react-router-dom";

class Results extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	render() {
		const scores = this.props.scores.filter((x) => x[0] !== "").sort((a, b) => a[1] - b[1]);
		let positions = [{ position: 1, score: scores[0][1], player: scores[0][0] }];
		scores.shift();
		scores.forEach((score) => {
			positions.unshift({
				position:
					score[1] === positions[0].score
						? positions[0].position
						: positions[0].position + positions.filter((p) => p.score === positions[0].score).length,
				score: score[1],
				player: score[0]
			});
		});
		return (
			<div className={`results ${this.context.darkMode ? "dark" : "light"}`}>
				<div>
					<h1>{dict(this.context.lang, 46)}</h1>
					<table className="table table-borderless mt-5">
						<thead>
							<tr>
								<th>{dict(this.context.lang, 47)}</th>
								<th>{dict(this.context.lang, 48)}</th>
								<th>{dict(this.context.lang, 49)}</th>
							</tr>
						</thead>
						<tbody>
							{positions
								.sort((a, b) => a.player.localeCompare(b.player))
								.sort((a, b) => a.score - b.score)
								.map((p, i) => {
									return (
										<tr key={i}>
											<td>#{p.position}</td>
											<td>{p.player}</td>
											<td>{p.score}</td>
										</tr>
									);
								})}
						</tbody>
					</table>
					<div className="d-flex justify-content-end">
						<button className={`btn rounded-pill btn-${this.context.darkMode ? "secondary" : "info"}`}>
							<Link to="/login" onClick={this.context.reloadConn}>
								{dict(this.context.lang, 50)}
							</Link>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Results;
