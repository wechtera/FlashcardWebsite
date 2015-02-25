var listDepends = new Deps.Dependency;

if (Meteor.isClient) {

	Template.CreateDeckCard.events({

			'submit .AddCardForm':function(event) {
				event.preventDefault();
				console.log("Card Submitted");
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
					var tempAddDeckFront = []; 
					var tempAddDeckBack = [];
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
				//Storing metadata of it
				var deckName = event.target.DeckName.value;
				var deckDescript = event.target.DeckDescript.value;
				sessionStorage.setItem("deckName", deckName);
				sessionStorage.setItem("deckDescript", deckDescript);

				return false;
			},
			'click .CreateDeckButton':function(event) {
				//get deck title descript fronts and backs
				var deckName = sessionStorage.getItem("deckName");
				var deckDescript = sessionStorage.getItem("deckDescript");
				var deckFronts = JSON.parse(sessionStorage.getItem("tempDeckFront"));
				var deckBacks = JSON.parse(sessionStorage.getItem("tempDeckBack"));
				flashDeck.insert({
					name: deckName,
					description: deckDescript,
					dateCreated: new Date(),
					fronts: deckFronts,
					backs: deckBacks
				});
				sessionStorage.clear();
				Router.go('/');

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
		},
		isEmpty: function(v1) {
			return v1 =="" || v1 ==" ";
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
		$('#existCardFronts').on('scroll', function() {
			$('#existCardBacks').scrollTop($(this).scrollTop());
		});
		$('#existCardBacks').on('scroll', function() {
			$('#existCardFronts').scrollTop($(this).scrollTop());
		});
			
	}
}
