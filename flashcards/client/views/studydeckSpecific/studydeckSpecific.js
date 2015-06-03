var deckfronts;
var deckbacks;
var order;
var current;
if(Meteor.isClient) {
	Template.study.events({
			'click .nextcard': function(event) {
				//method to go to the next card
				console.log("Clicked!");
				console.log("Order: " + order);
				console.log("Current: " + current);
				$(".cardDisplay-front").html(deckfronts[order[current]]);
				$(".cardDisplay-back").html(deckbacks[order[current]]);
				current++;
				localStorage.setItem("current",current);

			}
	});
	Template.studydeck.helpers({
			getDeckFront: function() {
				console.log("Pinged");
				return "hello";
			}
	});
	Template.study.rendered= function() {
		console.log("Returning:  " + localStorage.getItem("firstTime"));
		if(localStorage.getItem("firstTime") === null) {
			localStorage.setItem("firstTime", "true");
			deckfronts = JSON.parse(localStorage.getItem("deckFronts"));
			deckbacks = JSON.parse(localStorage.getItem("deckBacks"));
			deckfronts = JSON.parse(deckfronts);
			deckbacks = JSON.parse(deckbacks);
			var order = [];
			for(var i = 0; i < deckfronts.length; i++) {
				order[i] = i;
			}

			function shuffle(array) {
				var counter = array.length, temp, index;

				while(counter > 0) {
					index = Math.floor(Math.random() * counter);

					counter--;

					temp = array[counter];
					array[counter] = array[index];
					array[index] = temp;
				}
				return array;
			}
			order = shuffle(order);
			current = 1;
			$(".cardDisplay-front").html(deckfronts[order[0]]);
			$(".cardDisplay-back").html(deckbacks[order[0]]);
			localStorage.setItem("order",order);
			localStorage.setItem("current", current);
		}
		else {
			order = localStorage.getItem("order");
			current = localStorage.getItem("current");
		}
	};


}
