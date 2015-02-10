
if(Meteor.isClient) {
	Template.studydeck.helpers({
		getDecks: function() {
			return flashDeck.find().fetch();
		}
	
	});
}
