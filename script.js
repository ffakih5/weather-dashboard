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
var apiKey = "0285f9ca23eb9733a78696b08ba93c18";

function find(cs){
    for (var i=0; i < cities.length; i++){
        if(cs.toLowerCase()===cities[i]){
            return -1;
        }
    }
    return 1;
}

function weatherShown(event){
    event.preventDefault();
    if(searchCity.val().trim()!==""){
        city=searchCity.val().trim();
        currentWeather(city);

    }

}


function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){

        var weatherIcon = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/"+weatherIcon+".png";
        
        var date = new Date(response.dt*1000).toLocaleDateString();
        
        $(currentCity).html(response.name +"("+date+")" + "<img src="+iconUrl+">");

        var forTemp = (response.main.temp - 273.15);
        $(currentTemperature).html((forTemp).toFixed(2) +"&#8451");

        $(currentHumidity).html(response.main.humidity+"%");

        var windSpeed = response.wind.speed;
        var windSpeedMph = (windSpeed*2.37).toFixed(1);
        $(currentWindSpeed).html(windSpeedMph+"mph");

        UVIndex(response.coord.lon,response.coord.lat);
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

    var uviqURL="https://api.openweathermap.org/data/2.5/uvi?appid="+ apiKey+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url:uviqURL,
        method:"GET"
        }).then(function(response){
        $("currentUvIndex").html(response.value);
        });
}

function forecast(cityid){
    
    var forecastQURL = "https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+apiKey;
    $.ajax({
        url:forecastQURL,
        method:"GET"
        }).then(function(response){
        
        for(i=0; i<5;i++){
            var date = new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
            var iconId = response.list[((i+1)*8)-1].weather[0].icon;
            var iconUrl = "https://openweathermap.org/img/wn/"+iconId+".png";
            var tempKel = response.list[((i+1)*8)-1].main.temp; 
            var tempCel = (((tempKel- 273.15))).toFixed(2);
            var humidity = response.list[((i+1)*8)-1].main.humidity; 

            $("#forDate"+i).html(date);
            $("#forImg"+i).html("<img src="+iconUrl+">");
            $("#forTemp"+i).html(tempCel+"&#8451");
            $("#forHumidity"+i).html(humidity+"%");
        }

        });
  
    }
function addToList(cs){
    var listEl = $("<li>"+cs.toLowerCase()+"</li>");
    $(listEl).attr("class","list-group");
    $(listEl).attr("data-value",cs.toLowerCase());
    $(".list-group").append(listEl);
}

function invokePreviousCity(event){
    var listItem = event.target;
    if(event.target.matches("li")){
        city = listItem.textContent.trim();
        currentWeather(city);
    }

}

function showLastCity(){
    $("ul").empty();
    var cities = JSON.parse(localStorage.getItem("cityname"));
    if(cities!==null){
        cities = JSON.parse(localStorage.getItem("cityname"));
        for(i=0; i<cities.length; i++){
            addToList(cities[i]);
        }
        city=cities[i-1];
        currentWeather(city);
    }

}
function clearSearch(event){
    event.preventDefault();
    cities = [];
    localStorage.removeItem("cityname");
    document.location.reload();

}

$("#search-button").on("click",weatherShown);
$(document).on("click",invokePreviousCity);
$(window).on("load",showLastCity);
$("#clear-search").on("click",clearSearch);
