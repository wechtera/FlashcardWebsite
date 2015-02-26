var dependencyVar = new Deps.Dependency;
var currentFocus =  null;


if(Meteor.isClient) {
	Template.studydeck.helpers({
		getDecks: function() {
			return flashDeck.find().fetch();
		}
		/*
		getDecksMine: function() {
			return flashDeck.find(userId: getCurrentUser).fetch();
		}
		*/
	});
	Template.studydeck.events({
		'click .deckListDivs': function(event) {
			var id = event.currentTarget.id;
			var ele = event.currentTarget;
			console.log(id);
			if(currentFocus === null) {
				currentFocus = id;
				ele.className = "listDivFocused";

			}
			else {
				//Need to clear focus events from other div
				document.getElementById(currentFocus).className = "deckListDivs";
				currentFocus = id;
				ele.className = "listDivFocused";
			}
		}
	});

	Template.studydeck.rendered = function() {
		$('select').Minimalistbox();
		
	}
}
