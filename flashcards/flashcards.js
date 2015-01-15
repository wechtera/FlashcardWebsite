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


if (Meteor.isClient) {


	Template.CreateDeckCard.events({
			'submit form':function(event) {
				event.preventDefault();
				console.log("Card Submitted");
				var cardFront = event.target.CardFront.value;
				var cardBack = event.target.CardBack.value;
				currentAddFronts[currentAddFronts.length] =  cardFront;
				currentAddBacks[currentAddBacks.length] = cardBack;
				console.log(currentAddFronts[1]);
				console.log(currentAddBacks[1]);
				event.target.CardFront.value="";
				event.target.CardBack.value="";
				
				//after we have cards we update below

			}
	});
	Template.CreatDeckCard.helpers ({
		'front': function() {
			return currentAddFronts.find();
		},
		'back': function() {
			return currentAddBacks.find();
		}
	});
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

}
