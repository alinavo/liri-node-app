require("dotenv").config();

// NPM module used to access Spotify API.
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// NPM module used to access OMDB API.
var request = require("request");

// NPM module used to read the random.txt file.
var fs = require("fs");

// Text file for logs -- "do-what-it-says"
// var textFile = './random.txt';

// NPM module for axios   
var axios = require("axios");

//NPM module for moment
var moment = require('moment');

//keys 
var keys = require('./keys');



//command from user
var command = process.argv[2];
console.log(command);
var argument = process.argv.slice(3).join("+");
console.log(argument);


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

//function add contents of command
//will print "borders" between commands
function addContent() {
    console.log("");
    console.log("Content has been added!");
    console.log("-----------------------------------\n");
    appendFile("-----------------------------------\n");
};


//concertThis function
function concertThis(argument) {
    var artist = argument;
    if (artist == "") {
        artist = "Drake"
    }
    var bandURL = "https://rest.bandsintown.com/artists/" + var1 + "/events?app_id=codingbootcamp"
    axios.get(bandURL).then(
        function (response) {
            //Venue
            console.log("Venue: " + response.venue.name);
            //Location 
            console.log("Location: " + response.venue.city);
            //Time MM/DD/YYYY
            console.log("Date of Event " + moment(response.datetime).format("MM/DD/YYYY"));
            //confirmed content has been added
            addContent();
        })
};

//spotifyThis function
function spotifyThis(argument) {
    var song = argument;
    if (song == "") {
        //if song is unidentified, default is "Africa" by Toto
        song = "Africa";
        console.log(song);
    } 
    spotify.search({
        type: 'track',
        query: song
    }, function (error, data) {
        if (error) {
            return console.log("ERROR: " + error);
        }
        data = data.tracks.items[0];
        // console.log(data);
        console.log("Artist(s) Name: ", data.artists[0].name);
        console.log("Track Name: ", data.name);
        console.log("Preview URL: ", data.preview_url);
        console.log("Album: ", data.album.name);
        addContent();
    });
};


//movieThis function 
function movieThis(argument) {
    var movieName = argument;
    //if movie is unidentified, default is "Mr. Nobody"
    if (movieName == "") {
        movieName = "Mr.+Nobody"
    };
    var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {
            //   * Title of the movie.
            console.log("Title: " + response.data.Title);
            //   * Year the movie came out.
            console.log("Release Year: ", response.data.Year);
            //   * IMDB Rating of the movie.
            console.log("IMDb Rating: ", +response.data.imdbRating);
            //   * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes Score: ", +response.data.Ratings[1].Value);
            //   * Country where the movie was produced.
            console.log("Country: " + response.data.Country);
             //   * Language of the movie.
             console.log("Language: " + response.data.Language);
             //   * Plot of the movie.
            console.log("Plot: " + response.data.Plot);
            //   * Actors in the movie.
            console.log("Actors: " + response.data.Actors);
            addContent();
});
            



// Uses fs node package to take the text inside random.txt,
function doWhatItSays() {
    if (error) {
        console.log('ERROR: Reading random.txt -- ' + error);
        return;
    } else {
        // Creates array with data and splits
        var randomArray = data.split(",");
        // Sets action to first item in array.
        command = randomArray[0];
        console.log(command);
        // Sets third argument to second item in array.
        argument = randomArray[1];
        console.log(argument);
        commandSwitch(command, argument);
    };

};
}
