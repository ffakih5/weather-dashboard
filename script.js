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
        var weatherIcon = response.weather[0].icon;
        var iconUrl = "://openweathermap.org/img/wn/"+weatherIcon +"@2x.png";
        
        var date = new Date(response.dt*1000).toLocaleDateString();

        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconUrl+">");

        var forTemp = (response.main.temp - 273.15) * 1.80 + 32;
        $(currentTemperature).html((forTemp).toFixed(2) +"&#8457");

        $(currentHumidity).html(response.main.humidity+"%");

        var windSpeed = response.wind.speed;
        var windSpeedMph = (windSpeed*2.37).toFixed(1);
        $(currentWindSpeed).html(windSpeedMph+"mph");

        currentUvIndex(response.coord.lon,response.coord.lat);
        forecast(response.id);
        if(response.code==200){
            cities=JSON.parse(localStorage.getItem("cityname"));
            
            if(cities==null){
                cities = [];
                cities.push(city.toLowerCase());
                localStorage.setItem("cityname",JSON.stringify(cities));
                addToList(city);

            }
            else {
                if(find(city)>0){
                    cities.push(city.toLowerCase());
                    localStorage.setItem("cityname",JSON.stringify(cities));
                    addaToList(city);
                }
            }

        }

    });

}
function UVIndex(lon,lat){

    var uviQURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lt+"&lon="+ln
    $.ajax({
        url:uviQURL,
        method:"GET"
        }).then(function(response){
        $("currentUvIndex").html(response.value);
        });
}

function forecast(cityid){
    var dayOver = false;
    var forecastQURL = "https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+apiKey;
    $.ajax({
        url:forecastQURL,
        method:"GET"
        }).then(function(response){
        
        for(i=0; i<5;i++){
            var date = new Date(response.list[((i+1)*8)-1]*1000).toLocaleDateString();
        }
        })
  


}