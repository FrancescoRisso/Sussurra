/*

description:
	A generic dropdown menu
	
state:
	
props:
	- type: what is the content type to be displayed (supported: img)
	- options: the options that should be displayed
	- selected: the code of the selected option
	- css: additional css classes for the content
	- tooltip: what to display as a tooltip
	- darkMode: whether the website is currently in dark mode or not
	
functions:
	
imported into:
	- TopBar
	
dependences:
	- dropdown.svg
	- DropdownMenu.css
	
*/

import React from "react";
import DropdownSvg from "../../images/dropdown.svg";
import "./DropdownMenu.css";

class DropdownMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = { selected: props.options.filter((item) => item.code === props.selected)[0], visible: false };
	}

	componentDidUpdate(props) {
		if (props !== this.props)
			this.setState({
				selected: this.props.options.filter((item) => item.code === this.props.selected)[0],
				visible: false
			});
	}

	render() {
		return (
			<div className="dropdown">
				<button
					className="btn p-0"
					onClick={() => {
						this.setState((state) => {
							return { visible: !state.visible };
						});
					}}
					title={this.props.tooltip}
				>
					{this.props.type === "img" ? (
						<img alt={this.state.selected.code} src={this.state.selected.name} className={this.props.css} />
					) : (
						""
					)}
					<img
						src={DropdownSvg}
						alt=""
						height="10px"
						className="ml-1"
						style={this.state.visible ? { transform: "rotate(180deg)" } : {}}
					/>
				</button>

				<div className={this.state.visible ? "dropdownList" : "d-none"}>
					<ul className="list-group list-group-flush">
						{this.props.options.map((option) => {
							return (
								<li
									key={option.code}
									className="list-group-item clickable"
									onClick={() => {
										option.action();
									}}
									title={option.tooltip}
								>
									{this.props.type === "img" ? (
										<img alt={option.code} src={option.name} className={this.props.css} />
									) : (
										""
									)}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}

export default DropdownMenu;
