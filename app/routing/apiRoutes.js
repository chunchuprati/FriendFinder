var friendData 		= require('../data/friends.js');
var path 			= require('path');


var totalDifference = 0;

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});


	app.post('/api/friends', function(req, res){
		
		var newFriendScores = req.body.scores;
		var scoresArray = [];
		var friendCount = 0;
		var bestMatch = 0;

		for (var i = 0; i < friendData.length; i++){
			var scoresDiff = 0;
			for ( var j = 0; j < newFriendScores.length; j++){
				scoresDiff = (Math.abs(parseInt(friendData[i].scores[j]) - parseInt(newFriendScores[j])));
			}
			scoresArray.push(scoresDiff);
		}


		for ( var i = 0; i < scoresArray.length; i++){

			if(scoresArray[i] <= scoresArray[bestMatch]){
				bestMatch = i;
			}
		}
		var bestFriendFinder = friendData[bestMatch];
		res.json(bestFriendFinder);

		friendData.push(req.body);
		// res.json(friendData[0]);
	});
};