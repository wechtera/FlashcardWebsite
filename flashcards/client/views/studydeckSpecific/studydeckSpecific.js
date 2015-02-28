if(Meteor.isClient) {
	Template.study.helpers({});
	Template.study.events({});
	Template.study.rendered= function() {
			$(".cardDisplay").update("hello");
	};

}
