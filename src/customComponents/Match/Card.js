/*

description:
	A card
	
state:
	
props:
	- card
	- clickEvent
	- clickable: whether the card is clickable or not, to know if to show a hand overing it
	
functions:
	- cardNames{}: the list of names of all the cards in all the languages {lang: {card: name}}
	
imported into:
	- PlayerCards
	- Match
	
dependences:
	- react-inlinesvg
	- Settings
	- red and black joker images
	
*/

import React from "react";
import SVG from "react-inlinesvg";
import Settings from "../../SettingsContext";
import redJoker from "../../images/Cards/red_joker.png";
import blackJoker from "../../images/Cards/black_joker.png";
import cardSvgs from "./cardSvgs"

class Card extends React.Component {
	static contextType = Settings;

	constructor(props) {
		super(props);
	}

	// Card is a 2-char string: first char is the value (A, 1..9, 0 for 10, J, Q, K, G for Joker)
	// Second char is the seed (italian): C-> cuori, Q-> quadri, F-> fiori, P-> picche; R-> rosso, N-> nero (Jokers)
	// If the rear is visualised, props.card is just "R", then this component will render the correct back according to the color settings of the website
	// RN is a black back (retro nero), RR red back (retro rosso), NN is an empty spot for a card
	cardNames = {
		it: {
			AC: "asso di cuori",
			AQ: "asso di quadri",
			AF: "asso di fiori",
			AP: "asso di picche",
			"2C": "2 di cuori",
			"2Q": "2 di quadri",
			"2F": "2 di fiori",
			"2P": "2 di picche",
			"3C": "3 di cuori",
			"3Q": "3 di quadri",
			"3F": "3 di fiori",
			"3P": "3 di picche",
			"4C": "4 di cuori",
			"4Q": "4 di quadri",
			"4F": "4 di fiori",
			"4P": "4 di picche",
			"5C": "5 di cuori",
			"5Q": "5 di quadri",
			"5F": "5 di fiori",
			"5P": "5 di picche",
			"6C": "6 di cuori",
			"6Q": "6 di quadri",
			"6F": "6 di fiori",
			"6P": "6 di picche",
			"7C": "7 di cuori",
			"7Q": "7 di quadri",
			"7F": "7 di fiori",
			"7P": "7 di picche",
			"8C": "8 di cuori",
			"8Q": "8 di quadri",
			"8F": "8 di fiori",
			"8P": "8 di picche",
			"9C": "9 di cuori",
			"9Q": "9 di quadri",
			"9F": "9 di fiori",
			"9P": "9 di picche",
			"0C": "10 di cuori",
			"0Q": "10 di quadri",
			"0F": "10 di fiori",
			"0P": "10 di picche",
			JC: "fante di cuori",
			JQ: "fante di quadri",
			JF: "fante di fiori",
			JP: "fante di picche",
			QC: "donna di cuori",
			QQ: "donna di quadri",
			QF: "donna di fiori",
			QP: "donna di picche",
			KC: "re di cuori",
			KQ: "re di quadri",
			KF: "re di fiori",
			KP: "re di picche",
			GR: "jolly rosso",
			GN: "jolly nero",
			RN: "retro nero",
			RR: "retro rosso",
			NN: ""
		},
		en: {
			AC: "ace of hearts",
			AQ: "ace of diamonds",
			AF: "ace of clubs",
			AP: "ace of spades",
			"2C": "2 of hearts",
			"2Q": "2 of diamonds",
			"2F": "2 of clubs",
			"2P": "2 of spades",
			"3C": "3 of hearts",
			"3Q": "3 of diamonds",
			"3F": "3 of clubs",
			"3P": "3 of spades",
			"4C": "4 of hearts",
			"4Q": "4 of diamonds",
			"4F": "4 of clubs",
			"4P": "4 of spades",
			"5C": "5 of hearts",
			"5Q": "5 of diamonds",
			"5F": "5 of clubs",
			"5P": "5 of spades",
			"6C": "6 of hearts",
			"6Q": "6 of diamonds",
			"6F": "6 of clubs",
			"6P": "6 of spades",
			"7C": "7 of hearts",
			"7Q": "7 of diamonds",
			"7F": "7 of clubs",
			"7P": "7 of spades",
			"8C": "8 of hearts",
			"8Q": "8 of diamonds",
			"8F": "8 of clubs",
			"8P": "8 of spades",
			"9C": "9 of hearts",
			"9Q": "9 of diamonds",
			"9F": "9 of clubs",
			"9P": "9 of spades",
			"0C": "10 of hearts",
			"0Q": "10 of diamonds",
			"0F": "10 of clubs",
			"0P": "10 of spades",
			JC: "jack of hearts",
			JQ: "jack of diamonds",
			JF: "jack of clubs",
			JP: "jack of spades",
			QC: "queen of hearts",
			QQ: "queen of diamonds",
			QF: "queen of clubs",
			QP: "queen of spades",
			KC: "king of hearts",
			KQ: "king of diamonds",
			KF: "king of clubs",
			KP: "king of spades",
			GR: "red jolly",
			GN: "black jolly",
			RN: "black back",
			RR: "red back",
			NN: ""
		}
	};

	render() {
		//if (this.props.clickable) console.log(this.props.clickEvent);
		if (this.props.card.card === "NN")
			return (
				<div className={`card-wrapper ${this.props.clickable ? "click" : ""}`} onClick={this.props.clickEvent}>
					<SVG src={cardSvgs.NN} />
				</div>
			);
		if (this.props.card.card.charAt(0) === "G" && this.props.card.visible)
			return (
				<div className={`card-wrapper ${this.props.clickable ? "click" : ""}`} onClick={this.props.clickEvent}>
					<img
						src={this.props.card.card[1] === "R" ? redJoker : blackJoker}
						width="100%"
						className="card"
						alt={this.cardNames[this.props.card.card]}
					/>
				</div>
			);
		if (this.props.card.visible)
			return (
				<div className={`card-wrapper ${this.props.clickable ? "click" : ""}`} onClick={this.props.clickEvent}>
					<SVG src={cardSvgs[this.props.card.card]} />
				</div>
			);
		return (
			<div className={`card-wrapper ${this.props.clickable ? "click" : ""}`} onClick={this.props.clickEvent}>
				<SVG src={cardSvgs[this.context.darkMode ? "RN" : "RR"]} />
			</div>
		);
	}
}

export default Card;
