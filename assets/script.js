var location;
// current weather variables
var currentTemp;
var currentHumid;
var currentWind;
var currentUv;
var currentIcon;

// forecast variables
var dayOneTempH;
var dayOneTempL;
var dayOneHumid;
var dayTwoTempH;
var dayTwoTempL;
var dayTwoHumid;
var dayThreeTempH;
var dayThreeTempL;
var dayThreeHumid;
var dayFourTempH;
var dayFourTempL;
var dayFourHumid;
var dayFiveTempH;
var dayFiveTempL;
var dayFiveHumid;


var citySearch = document.getElementById("citySearch");
var searchBtn = $("#searchBtn");


// displays last city searched at launch
var selectedCityLs = JSON.parse(localStorage.getItem("citySearch"));


// displays last city searched plus current date with clock
setInterval(function(){
  var date = moment().format('l');
  showCityDate.textContent = selectedCityLs + " " + "(" + date + ")";
});


// gets user input from search for city field and sets to local storage
searchBtn.on('click', function () {
  var selectedCity = $("#citySearch").val();
  localStorage.setItem("citySearch", JSON.stringify(selectedCity));
  selectedCityLs = JSON.parse(localStorage.getItem("citySearch"));
});


function getWeather() {
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=4b37cdd7653dfc3582c009509a56e3eb&q=' + selectedCityLs;

    fetch(weatherUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      currentTemp = data.main.temp.toFixed(1);
      currentHumid = data.main.humidity;
      currentWind = data.wind.speed.toFixed(0);
      // currentUv =
      // currentIcon = data.weather[0].icon;
      // console.log(currentIcon);
      
      showCurrentTemp.textContent = "Temperature: " + currentTemp + "°F" ;
      showCurrentHumid.textContent = "humidity: " + currentHumid + "%";
      showCurrentWind.textContent = "Wind Speed: " + currentWind + "mph";
      // showCurrentUv.textContent = "UV Index: "
      // showCurrentIcon.textContent = currentIcon;
    })
  }; getWeather()


  function getForecast() {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=279105e2e4e9e82f777d589c68abec56&q=' + selectedCityLs;

    fetch(forecastUrl) 
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      dayOneH = data.list[0].main.temp_max.toFixed(0);
      dayOneL = data.list[0].main.temp_min.toFixed(0);
      dayOneHumid = data.list[0].main.humidity;

      dayTwoH = data.list[1].main.temp_max.toFixed(0);
      dayTwoL = data.list[1].main.temp_min.toFixed(0);
      dayTwoHumid = data.list[1].main.humidity;

      dayThreeH = data.list[2].main.temp_max.toFixed(0);
      dayThreeL = data.list[2].main.temp_min.toFixed(0);
      dayThreeHumid = data.list[2].main.humidity;

      dayFourH = data.list[3].main.temp_max.toFixed(0);
      dayFourL = data.list[3].main.temp_min.toFixed(0);
      dayFourHumid = data.list[3].main.humidity;

      dayFiveH = data.list[4].main.temp_max.toFixed(0);
      dayFiveL = data.list[4].main.temp_min.toFixed(0);
      dayFiveHumid = data.list[4].main.humidity;

      showDayOneH.textContent = "High: " + dayOneH + "°F";
      showDayOneL.textContent = "Low: " + dayOneL + "%";
      showDayOneHumid.textContent = "Humidity: " + dayOneHumid + "%";

      showDayTwoH.textContent = "High: " + dayTwoH + "°F";
      showDayTwoL.textContent = "Low: " + dayTwoL + "%";
      showDayTwoHumid.textContent = "Humidity: " + dayTwoHumid + "%";

      showDayThreeH.textContent = "High: " + dayThreeH + "°F";
      showDayThreeL.textContent = "Low: " + dayThreeL + "%";
      showDayThreeHumid.textContent = "Humidity: " + dayThreeHumid + "%";

      showDayFourH.textContent = "High: " + dayFourH + "°F";
      showDayFourL.textContent = "Low: " + dayFourL + "%";
      showDayFourHumid.textContent = "Humidity: " + dayFourHumid + "%";

      showDayFiveH.textContent = "High: " + dayFiveH + "°F";
      showDayFiveL.textContent = "Low: " + dayFiveL + "%";
      showDayFiveHumid.textContent = "Humidity: " + dayFiveHumid + "%";
    })
  }; getForecast()



// getWeather api key = 4b37cdd7653dfc3582c009509a56e3eb
// getForecast api key = 279105e2e4e9e82f777d589c68abec56

  
