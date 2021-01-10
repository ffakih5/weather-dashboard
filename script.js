//Variables
var searchButton = $("#search-button");
var clearButton = $("#clear-search");
var searchCity = $("#search-city");
var currentCity = $("#current-city");
var currentTemperature = $("#temperature");
var currentHumidity = $("#humidity");
var currentWindSpeed = $("#wind-speed");
var currentUvIndex = $("#uv-index");
var cities = [];
var city = "";
var searchButton = $();
var apiKey = "0285f9ca23eb9733a78696b08ba93c18";

//find cities
function find(cs){
    for (var i=0; i < cities.length; i++){
        if(cs.toLowerCase()===cities[i]){
            return -1;
        }
    }
    return 1;
}
