require("dotenv").config();

// NPM module used to access Spotify API.
var spotify = require("spotify");

// NPM module used to access OMDB API.
var request = require("request");

// NPM module used to read the random.txt file.
var fs = require("fs");

// Text file for logs -- "do-what-it-says"
var textFile = './random.txt';

// NPM module for axios   
var axios = require("axios");

//NPM module for moment
var moment = require('moment');


//command from user
var command = process.argv[2];
var argument = process.argv.slice(3).join("+");


commandSwitch(command, argument);

//main switch statement function with command and argument taken in from user
function commandSwitch(command, argument) {
    switch (command) {
        case 'concert-this':
            concertThis(argument);
            break;
        case 'spotify-this-song':
            spotifyThis(argument);
            break;
        case 'movie-this':
            movieThis(argument);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Please enter a valid command.")
            return;
    }
}

//concerThis function
function concertThis(argument) {
    var artist = argument;
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "?app_id=codingbootcamp";
    request(queryUrl, function (error, response, body) {
        if (error) { console.log(error) };
        var result = JSON.parse(body)[0];
        //name
        console.log("Venue: " + result.venue.name);
        //venue 
        console.log("Location: " + result.venue.city);
        //time
        console.log("Date of Event " + moment(result.datetime).format("MM/DD/YYYY"));
        //confirmed content has been added
        addContent();
    });
  }

  