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

//weather displayed once city put in to form
function weatherShown(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);

    }

}

//AJAX call with URL to get data from weather server.
function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" +
    city + "&appid=" + apiKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){

        console.log(response);



   
   
   
   
   
   
   
    })

}
