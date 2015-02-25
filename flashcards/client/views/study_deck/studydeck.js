
if(Meteor.isClient) {
	Template.studydeck.helpers({
		getDecks: function() {
			return flashDeck.find().fetch();
		}

	
	});
	Template.studydeck.rendered = function() {
		$('select').Minimalistbox();
	}
}
