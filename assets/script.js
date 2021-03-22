var location;
var currentTemp
var humidity;
var windSpeed
var UvIndex
var weatherIcon;
var showCurrentTemp = document.getElementById("showCurrentTemp");



function getWeather() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=4b37cdd7653dfc3582c009509a56e3eb';

    fetch(requestUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentTemp = data.main.temp
      console.log(currentTemp),
      showCurrentTemp.textContent = "Temperature: " + currentTemp + " °F" ;
      
    })
    
  }; getWeather()

  
