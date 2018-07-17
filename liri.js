require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmnd = process.argv[2];

if (cmnd === "my-tweets") {
    myTweets();
    console.log("my-tweets")
} else if (cmnd === "spotify-this-song") {
    spotifyThisSong();
    console.log("spotify-this-song")
} else if (cmnd === "movie-this") {
    console.log("movie-this")
} else if (cmnd === "do-what-it-says") {
    console.log("do-what-it-says")
}

function myTweets() {
    client.get('statuses/user_timeline', { screen_name: 'brotillathehun', count: 20 }, function(error, tweets, response) {
        if(error) {
            console.log(error)
        };
        var data = tweets;

        for (i=0; i<data.length; i++) {
            console.log(
                "\nUser: " + data[i].user.name + "  |  @" + data[i].user.screen_name + "\n ' " +
                data[i].text + " ' " + "\nCreated: " + data[i].created_at + "\n"
            )
        }
    });
};

function spotifyThisSong() {
    var input = process.argv[3]
    if (!input) {
        input = "Clock Catcher"
    };
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      var results = data.tracks.items;
      console.log(
          "\nTitle: " + results[0].name +
          "\nArtists: " + results[0].artists[0].name +  // puts an object for each artist, loop through and grab ALL artist names
          "\nAlbum: " + results[0].album.name +
          "\nLink: " + results[0].external_urls.spotify
      )
      console.log(results[0].artists) // search "X Black Panther" to see what i mean. Make a for loop
    });
}