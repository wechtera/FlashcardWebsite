flashDeck = new Mongo.Collection('flashDeck');


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
	this.route('studydeck');
	this.route('studyDeckSpecific', {
			template: 'studydeckSpecific',
			path: 'studydeck/:_id',
			data: function() {return flashDeck.findOne({_id: this.params.id})}
	});
});
