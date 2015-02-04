flashDeck = new Mongo.Collection('FlashDecks');

var deckName;
var deckDescription;
var listDepends = new Deps.Dependency;
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
			'submit .AddCardForm':function(event) {
				event.preventDefault();
				console.log("Card Submitted");
				var tempAddDeckFront = []; 
				var tempAddDeckBack = [];
				var cardFront = event.target.CardFront.value;
				var cardBack = event.target.CardBack.value;
				//fetching stuff
				if(sessionStorage.getItem("tempDeckFront" == null) || sessionStorage.length ==1) {
					console.log("Beep");
				}
				else { 
					console.log("boop");
					tempAddDeckFront = JSON.parse(sessionStorage.getItem("tempDeckFront"));
					tempAddDeckBack = JSON.parse(sessionStorage.getItem("tempDeckBack"));
				}
				//adding fronts and back
				if(tempAddDeckFront === null){
					tempAddDeckFront[0] = cardFront;
					tempAddDeckBack[0] = cardBack;
				}
				else {
					tempAddDeckFront[tempAddDeckFront.length] = cardFront;
					tempAddDeckBack[tempAddDeckBack.length] = cardBack;
				}
				//reset two name spaces
				event.target.CardFront.value="";
				event.target.CardBack.value="";
				sessionStorage.setItem("tempDeckFront", JSON.stringify(tempAddDeckFront));
				sessionStorage.setItem("tempDeckBack", JSON.stringify(tempAddDeckBack));
				//debugging
				console.log(tempAddDeckFront);
				console.log("current temp deck");
				
				//after we have cards we update below
				listDepends.changed();

			},
			'submit .MetaEnterForm':function(event) {
				event.preventDefault();
				var divToHide =document.getElementsByClassName('deckMetaBox')[0];
				divToHide.style.display = "none";
				divToHide.innerHTML='';
				sessionStorage.setItem("metaIn", true);
				return false;
			}
	});
	Template.CreateDeckCard.helpers ({
		tempAddFront: function() {
			
			listDepends.depend();
			var tempAddDeckFront;
			if(sessionStorage.getItem("tempDeckFront" === null) || sessionStorage.length ==0) 
				tempAddDeckFront = [];
			else
				tempAddDeckFront = JSON.parse(sessionStorage.getItem("tempDeckFront"));
			//debug
			console.log("Hitting Here");
			console.log(tempAddDeckFront);

			return tempAddDeckFront;
		},
		tempAddBack: function() {
			listDepends.depend();
			var tempAddDeckBack;
			if(sessionStorage.getItem("tempDeckBack" === null) || sessionStorage.length ==0) 
				tempAddDeckBack = [];
			else
				tempAddDeckBack = JSON.parse(sessionStorage.getItem("tempDeckBack"));
			//debug
			console.log(tempAddDeckBack);

			return tempAddDeckBack;
		}
	});
	Template.CreateDeckCard.rendered = function() {
			console.log("OnLoadCheck Hit");
			if(sessionStorage.getItem("metaIn")) {
				console.log("hiding Div");
				var divToHide =document.getElementsByClassName('deckMetaBox')[0];
				divToHide.style.display = "none";
				divToHide.innerHTML='';

			}
			
	}
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });

}
