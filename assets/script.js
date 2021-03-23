var location;
var currentTemp;
var currentHumid;
var currentWind;
var currentUv;
var currentIcon;

var showCityDate = document.getElementById("showCityDate");
var showCurrentTemp = document.getElementById("showCurrentTemp");
var showCurrentHumid = document.getElementById("showCurrentHumid");
var showCurrentWind = document.getElementById("showCurrentWind");
// var showCurrentUv = document.getElementById("showCurrentUv");
var showCurrentIcon = document.getElementById("showCurrentIcon")
var citySearch = document.getElementById("citySearch");
var searchBtn = $("#searchBtn");


// displays current date with clock
setInterval(function(){
  var date = moment().format('MMMM Do YYYY, h:mm a');
  showCityDate.textContent = "Current City " + date;
});


// gets user input from search for city field
searchBtn.on('click', function () {
  console.log("I was clicked")
  var selectedCity = $("#citySearch").val();

  localStorage.setItem("citySearch", JSON.stringify(selectedCity));
});


function getWeather() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=4b37cdd7653dfc3582c009509a56e3eb';

    fetch(requestUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      currentTemp = data.main.temp.toFixed(1);
      currentHumid = data.main.humidity;
      currentWind = data.wind.speed,
      // currentUv =
      currentIcon = data.weather[0].icon;
      
      
      showCurrentTemp.textContent = "Temperature: " + currentTemp + "°F" ;
      showCurrentHumid.textContent = "humidity: " + currentHumid + "%";
      showCurrentWind.textContent = "Wind Speed: " + currentWind + "mph";
      // showCurrentUv.textContent = "UV Index: "
      // showCurrentIcon.textContent = currentIcon;

      

      
      
    })
    
  }; getWeather()

  
