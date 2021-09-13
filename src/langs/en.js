export default [
	"Change language",
	"Light theme",
	"Dark theme",
	"How to play",
	"At the start of the game each player is given 4 cards. The goal of the game is to finish the match with the lowest score possible. Scoring follows this rules:",
	"The 4 cards are arranged in a rectangular shape, as in the image, but the player can only look at the lower ones (the red ones). The cards on top stay covered, so the player does not know what they are. In addition, when the game starts, each player does not know any of the opponents' cards.",
	"At this point the real game begins: taking turns, every player draws a card from the central deck, and thy can either discard it, or switch it with one of their cards, even if that one is unknown. The replaced card must be discarded, and is visible to all players. The freshly-drawn card, on the other hand, is visible only to the player that drew it.",
	"When a card is discarded, every player who has another card with the same number is allowed to throw it, remaining with one less card. However, you must be fast, because the the turn passes to the next player, and if he discards a different card, you cannot throw yours anymore.",
	'In every moment during their turn, a player cand say "stop": at that point the game continues until it\'s the player\'s turn again (but the player does not play anymore), then all the cards are revealed, and the winner is the player with the lowest score, computed as the sum of every (revealed and not revealed) card of each player. The game also ends if a player runs out of cards: as before, the game continues until it\'s the player without cards\' turn, with this player not playing anymore.',
	"When one of the following cards is drew from the deck and immediately discarded, the player can do the corresponding action (or they can decide not to do it):",
	"give a look at one of their cards they do not know yet (other players will not see it).",
	"give a look at one of the opponents' cards they do not know yet (other players will not see it).",
	"switch one of his cards with someone else's card.",
	"give a look at one of the opponents' cards, then decide if they wish to switch it with one of their cards.",
	'In every case the player can only know the value of the cards they have "already seen": for example, in case of a switch with a discarded J, if the player takes from an opponent a card the player itself has not seen yet, they will not be able to look at it, other than discarding an 8 from the deck (or switching it with a deck card, thus discarding it).',
	"Close",
	"Card positioning",
	"Color mode",
	"Pick a nickname:",
	"Already taken nicknames:",
	"Enter",
	"Connection to server was interrupted.",
	"Click here",
	"to return to login page.",
	"If this happened more than once, please contact the server admin.",
	"Please insert a nickname.",
	"Nickname",
	"has already been chosen by another player",
	"You",
	"player ready",
	"player not ready",
	"The match will start when every connected player (at least 2) will be ready.",
	"I am ready",
	"I am not ready",
	"Now playing:",
	"If you want, you can select one of your unknown card and see it, otherwhise ",
	"If you want, you can select an opponent's unknown card and see it, otherwhise ",
	"If you want, you can select one of your cards and an opponent's card and switch them, otherwhise ",
	"If you want, you can select an opponent's card and see it, and if you wish you can switch it with one of your cards, otherwhise ",
	"has",
	"have",
	"finished the cards. Match will end when it will be",
	"your trun again",
	"their turn",
	"said stop. Match will end when it will be",
	"Match has ended. Soon the results will be displayed",
	"Results",
	"position",
	"player",
	"score",
	"Return to login page",
	"show results",
	"hide results",
	"When it is your turn, click on the deck on the left to draw a card. At this point you can either click on the discard deck (on the right) to discard it, or you can click on one of your cards to replace it with the freshly-drawn card.",
	"When you discard an 8, you can either click on one of your unknown cards in order to see it, or click on the button on the top of the page (that will appear when you discard a \"special\" card) in order to decide not to do the action.",
	"When you discard a 9, you can either click on one of opponents' unknown cards in order to see it, or click on the button on the top of the page in order to decide not to do the action.",
	"When you discard a J, you can either click on two cards (one of yours and an opponents' one) in order to switch them, or click on the button on the top of the page in order to decide not to do the action (also doable if you have already selected a card).",
	"When you discard a Q, you can click on one of opponents' unknown cards in order to see it, or a known card in order to choose it. Then you can click on one of your cards in order to switch it with the opponent's one. In any moment, you can click on the button on the top of the page in order to decide not to see the card or not to switch it.",
	"When it is not your turn and you want to throw a card, you just have to click it. If you want to throw a card when it is your turn, it is important you do that before drawing a card.",
	'When you want to say STOP and you are inside your turn, just press the button in the bottom left. Be careful, though, because your turn ends when the next one starts: if you saw the popup "Now playing: ..." you will not be able to say STOP until your next turn.',
	"How to play on this website",
	"How the game works",
	"If you want you can select one of your cards and switch it with the selected one, otherwise ",
	"If you want you can select an opponent's card and switch it with the selected one, otherwise ",
	"(The deck was emptied, the discarded cards have been reshuffled)",
	"Maximum number of players (6) reached",
	"Example: let's imagine that the player knows two of his cards, a 4 and a 7. The player draws from the deck a very high card, such as a Q. At this point, it is not convenient to replace a known card (a 4 or a 7) with the new one, because the total value of his cards would increase (please remember, the goal of the game is to minimize the total score). On the other side, it is not even convenient to replace one of the unknown cards, since the probability that these cards have a lower value than the drawn one is very high. Thus, in this case it is convenient to discard the drawn card.",
	'Example: let\'s imagine that a player has just two cards left, an A and a 3, while all the other players have at least 3 cards. At this point, it is very likely that he is in the lead, so it is convenient for him to say "STOP". Beware though: the game does not end when someone says "STOP", so the situation can still change. For instance, another player could switch some cards (see below), thus completely reversing the situation.',
	"At the end of the game, when the results are shown, in the bottom left corner you can find a button to hide the results, to see revealed all the cards from every player."
];

// Indice della frase è riga-2