require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request")

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var cmnd = process.argv[2];

if (cmnd === "my-tweets") {
    console.log("my-tweets")
} else if (cmnd === "spotify-this-song") {
    console.log("spotify-this-song")
} else if (cmnd === "movie-this") {
    console.log("movie-this")
} else if (cmnd === "do-what-it-says") {
    console.log("do-what-it-says")
}