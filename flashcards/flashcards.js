flashDeck = new Mongo.Collection('FlashDecks');

var tempAddDeck = [];
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


if (Meteor.isClient) {


	Template.CreateDeckCard.events({
			'submit form':function(event) {
				event.preventDefault();
				console.log("Card Submitted");
				var cardFront = event.target.CardFront.value;
				var cardBack = event.target.CardBack.value;

				tempAddDeck[tempAddDeck.length] = {front : cardFront},{back : cardBack}
				//debug 
				//reset two name spaces
				event.target.CardFront.value="";
				event.target.CardBack.value="";
				
				//after we have cards we update below

			}
	});
	Template.CreateDeckCard.helpers ({
		tempAdd: function() {
			for(x in tempAddDeck)
				console.log(tempAddDeck[x].front);
			return tempAddDeck;
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

}
