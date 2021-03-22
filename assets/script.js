var location;
 
var humidity;
var windSpeed
var UvIndex
var weatherIcon;

function getWeather() {
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=atlanta&appid=4b37cdd7653dfc3582c009509a56e3eb';

    fetch(requestUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.temp)
      var currentTemp = data.main.temp
    })
    
  }; getWeather()
