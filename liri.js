require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js")

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var cmnd = process.argv[2];
var input = process.argv.slice(3).join(" ");

switch (cmnd) {
    case "my-tweets":
        myTweets();
        logCommand();        
        break;
    case "spotify-this-song":
        spotifyThisSong();
        logCommand();
        break;
    case "movie-this":
        movieThis();
        logCommand();
        break;
    case "do-what-it-says":
        doWhatItSays();
        // logCommand(); // I commented this out because i'm afraid of an infinite loop. Highly unlikely, but if you ran do-what-it-says, and it picked do-what-it-says, and then it picked do-what-it-says... You see where i'm going with this?
        break;
    default:
        console.log("\nPlease enter a valid command\n   • my-tweets\n   • spotify-this-song\n   • movie-this\n   • do-what-it-says")
}

function myTweets() {
    client.get('statuses/user_timeline', { count: 20 }, function(error, tweets, response) {
        if(error) {
            console.log(error)
        };
        var data = tweets;

        for (i=0; i<data.length; i++) {
            console.log(
                "\nUser:  " + data[i].user.name + "  |  @" + data[i].user.screen_name + "\n ' " +
                data[i].text + " ' " + "\nCreated: " + data[i].created_at + "\n"
            )
        }
    });
};

function spotifyThisSong() {
    if (!input) {
        input = "Clock Catcher" // I prefer this song to Ace of Bass, so I used it instead
    };
    spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var results = data.tracks.items;
        var artistsObj = results[0].artists;
        var artistsArr = "";
        for (i = 0; i < artistsObj.length; i++) {
        if (i === artistsObj.length - 1) {
            artistsArr = artistsArr + results[0].artists[i].name
        } else {
            artistsArr = artistsArr + results[0].artists[i].name + ", "
        }
        };
        console.log(
            "\nTitle: " + results[0].name +
            "\nArtists: " + artistsArr +
            "\nAlbum: " + results[0].album.name +
            "\nLink: " + results[0].external_urls.spotify + "\n"
      );
    });
}

function movieThis() {
    if (!input) {
        input = "Mr. Nobody"
    }
    request("http://www.omdbapi.com/?apikey=af8e132c&t=" + input, function (error, response, body) {
        if (error) {
            return console.log("Error occured: ", error);
        }
        var results = JSON.parse(body);
        console.log(
            "\nTitle: " + results.Title +
            "\nYear of Release: " + results.Year +
            "\nIMDB Rating: " + results.Ratings[0].Value +
            // "\nRotten Tomatoes Rating: " + results.Ratings[1].Value +
            "\nCountry of Production: " + results.Country +
            "\nLanguage(s): " + results.Language +
            "\nActors: " + results.Actors +
            "\nPlot Summary: " + results.Plot + "\n"
        )
});
}

function doWhatItSays() {
    var arr = [];
    fs.readFile('random.txt', "utf8", function(err, data) {
        if (err) {
            return console.log(err)
        };
        var txt = data.split(',');
        var randNum = Math.floor(Math.random() * txt.length);
        var doThis = txt[randNum];
        var whatever = doThis.split(" ");
        console.log("\nCan't think of a search? Hmm, how about this one?\n\n" + doThis + "\n");
        cmnd = whatever[0];
        input = whatever.slice(1).join(" ");
        switch (cmnd) {
            case "my-tweets":
                myTweets();
                break;
            case "spotify-this-song":
                spotifyThisSong();
                break;
            case "movie-this":
                movieThis();
                break;
            // case "do-what-it-says": // Commented out because these arent being logged to the random.txt
            //     doWhatItSays();
        }
    });
}

function logCommand() { // originally, i had it append to the file with a space after the comma, but that started making problems for the do-what-it-says-function
    fs.appendFile('random.txt',  "," + cmnd + " " + input, "utf8", function() {
        console.log("Logged!")
    });
}