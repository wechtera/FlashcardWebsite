flashDeck = new Mongo.Collection('FlashDecks');


//
//Mongo Setup:
//Decks Collection {
// Deck {
//     Userid:
//     Deckname:
//     Cards: [
//     		{front:
//     		 Back
//     		}
//     		{front:
//     		 Back:
//     		}
//     	]
//     Tags: [
//     		tag1, tag2, tag3
//     		]
// }
//
//
//
//
//SitePointing
// Routes defined here
Router.map(function() {
	this.route('CreateDeckCard');
	this.route('home', {
		path: '/'
	});
});