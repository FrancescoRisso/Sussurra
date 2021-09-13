/*

description:
	The four cards of a player
	
state:
	- 
	
props:
	- position: a string containing the two positioning classes
	- cards: the list of cards as {card: "", visible: bool} cards[0] is top-left, cards[1] top-right, cards[2] bottom-left, cards[3] bottom-right
	- self: if this PlayerCards is the playing player
	- name: the name of the player
	- cardClickEvent: the function to call when a card is clicked
	- cardClickable: a function to return whether a card is clickable or not
	
functions:
	- 
	
imported into:
	- Match
	
dependences:
	- Card
	
*/

import React from "react";
import Card from "./Card";

class PlayerCards extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`player ${this.props.position}`}>
				<div className={`playercard top ${this.props.name === "" ? "top-spaced" : ""} left`}>
					<Card card={this.props.cards[0]} clickable={this.props.cardClickable(0)} clickEvent={()=>{this.props.cardClickEvent(0)}} />
				</div>
				<div className={`playercard top ${this.props.name === "" ? "top-spaced" : ""} right`}>
					<Card card={this.props.cards[1]} clickable={this.props.cardClickable(1)} clickEvent={()=>{this.props.cardClickEvent(1)}} />
				</div>

				<p className="my-0 py-0 white">{this.props.name}</p>

				<div className="playercard bottom left">
					<Card card={this.props.cards[2]} clickable={this.props.cardClickable(2)} clickEvent={()=>{this.props.cardClickEvent(2)}} />
				</div>
				<div className="playercard bottom right">
					<Card card={this.props.cards[3]} clickable={this.props.cardClickable(3)} clickEvent={()=>{this.props.cardClickEvent(3)}} />
				</div>
			</div>
		);
	}
}

export default PlayerCards;
