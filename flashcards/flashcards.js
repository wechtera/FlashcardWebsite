
//SitePointing
// Routes defined here
Router.map(function() {
	this.route('CreateDeckCard');
	this.route('home', {
		path: '/'
	});
});



if (Meteor.isClient) {

 // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  Template.AddCardForm.events({
		'submit form':function(event) {
			console.log("Card Submitted");
			var cardFront = event.target.CardFront;
			var cardBack = event.target.CardBack;
		}
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}
