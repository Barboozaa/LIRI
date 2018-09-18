# LIRI Bot

## What is this?

This LIRI bot is a node command line application that takes in a few pre-determined arguments and returns data specific to the search. A log of commands entered is kept for reference by one of the LIRI functions

## How does it work?

LIRI takes in 4 preset commands:
* my-tweets
    * Pulls the 20 most recent tweets from the user's Twitter (assuming they have the proper keys)
* spotify-this-song
    * Searches Spotify with the keyword(s) passed in the command line and returns information about the song
* movie-this
    * Searches OMDB with the keyword(s) passed in the command line and returns information about the movie or show
* do-what-it-says
    * Perfect for the indecisive! Picks a random command that was run previously and runs it again.

If you can't remember these, don't worry! Running LIRI with no command will list all accepted input

## Requirements

To run this program, you must have a .env file with the following structure

```
# Spotify API keys

SPOTIFY_ID=YourIDHere
SPOTIFY_SECRET=YourSecretHere

# Twitter API keys

TWITTER_CONSUMER_KEY=YourKeyHere
TWITTER_CONSUMER_SECRET=YourSecretHere
TWITTER_ACCESS_TOKEN_KEY=YourKeyHere
TWITTER_ACCESS_TOKEN_SECRET=YourSecretHere
```
