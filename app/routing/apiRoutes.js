var friends = require('../data/friends.js');

console.log(friends);

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var totalDiff = 0;

        var bestMatch = {
            name: "",
            photo:"",
            friendDifference: 1000
        };

        var userData = req.body;
        var userName = userData.name;
        var userScores = userData.scores;

        //turn user score into a number 
        var b = userScores.map(function(item){
            return parseInt(item, 10);
        });

        userData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: b
        };

        var sum = b.reduce((a, b) => a+b,0);

/**TEST LOGS **/
        console.log("Score:"  + userData);
        console.log("sum: " + sum);

        //loops through all friend possibilities in database
        for(var i = 0; i<friends.length; i++){
            console.log(friends[i].name);

            totalDiff = 0;
           
            var friendScore = friends[i].scores.reduce((a,b) => a+b, 0);

            totalDiff += Math.abs(sum-friendScore);

            console.log(totalDiff);
            console.log(friendScore);

            //sum differences and determine best match for friend

            if(totalDiff <= bestMatch.friendDifference){
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDifference = totalDiff;
            }

            console.log(totalDiff);


        }

        friends.push(userData);
        console.log("New user added");
        console.log(userData);
        res.json(bestMatch);
    });

};