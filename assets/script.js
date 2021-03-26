// current weather variables
var currentTemp;
var currentHumid;
var currentWind;
var currentUv;
var location;

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

var date;

var searchBtn = $("#searchBtn");


// displays date
  setInterval(function(){
    date = moment().format('l');
    showDate.textContent = date;
});


// pulls last selected city from local storage on page load and displays data for last selected city
selectedCityLs = localStorage.getItem("searchedCity");
console.log(selectedCityLs);

if (selectedCityLs = !null) {
selectedCity = selectedCityLs; 
showCity.textContent = selectedCity;
getWeather();
}

// sets user input to var selectedCity, displays selected city, creates search history ul runs getWeather function
searchBtn.on('click', function () {
  selectedCity = $("#citySearch").val();

  // searchValues.push(selectedCity)
  showCity.textContent = selectedCity;

  // adds search values to display, adds click function to push clicked item to selectedCity  
  var ul = document.createElement("ul");
  ul.textContent = selectedCity;
  ul.addEventListener('click', function() {
    showCity.textContent = ul.textContent,
    selectedCity = showCity.textContent,
    getWeather();
  });
  localStorage.setItem("searchedCity", ul.textContent);
  searchHist.appendChild(ul);
  getWeather();
}); 


function getWeather() {

 var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=imperial&appid=4b37cdd7653dfc3582c009509a56e3eb&q=' + selectedCity;

 fetch(weatherUrl) 
 .then(function (response) {
   return response.json();
 })
 .then(function (data) {
  //  sets variables for current weather data plus coordinates for use in uv index
   cityLon = data.coord.lon;
   cityLat = data.coord.lat;
   currentTemp = data.main.temp.toFixed(0);
   currentHumid = data.main.humidity;
   currentWind = data.wind.speed.toFixed(0);
   currentIcon = data.weather[0].icon;

  //displays current weather data 
   showCurrentTemp.textContent = "Temperature: " + currentTemp + "°F" ;
   showCurrentHumid.textContent = "Humidity: " + currentHumid + "%";
   showCurrentWind.textContent = "Wind Speed: " + currentWind + "mph";

  // displays current weather icon 
   var iconImg = "http://openweathermap.org/img/wn/" + currentIcon + ".png"
   showCurrentIcon.setAttribute('src', iconImg);

  // api call for uv index
  var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + cityLat + "&lon=" + cityLon + "&appid=802248b8a798a6e1e59be31a4560e2ec";
    
  fetch(oneCallUrl) 
  .then(function (response) {
  return response.json();
  })
  .then(function (data) {

    // sets uv index variable from api call
    currentUv = data.current.uvi.toFixed(1)

    // displays current uv index
    showCurrentUv.textContent= "UV Index " + currentUv; 

    // determines uv index display background color
    if (currentUv < 3) {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: rgb(37, 200, 37)");
    } else if (currentUv < 6) {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: yellow");
    } else {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: red");
    };
  });
});

 // api for forecast
 var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=279105e2e4e9e82f777d589c68abec56&q=' + selectedCity;

 fetch(forecastUrl) 
 .then(function (response) {
   return response.json();
 })
 .then(function (data) {
  
  // sets weather data as variables from api call
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

  //  displays weather data
   showDayOneDate.textContent = date;
   showDayOneH.textContent = "High: " + dayOneH + "°F";
   showDayOneL.textContent = "Low: " + dayOneL + "°F";
   showDayOneHumid.textContent = "Humidity: " + dayOneHumid + "%";
   dayOneIcon = data.list[0].weather[0].icon;
   var dayOneImg = "http://openweathermap.org/img/wn/" + dayOneIcon + ".png"
   showDayOneIcon.setAttribute('src', dayOneImg);

   showDayTwoDate.textContent = date;
   showDayTwoH.textContent = "High: " + dayTwoH + "°F";
   showDayTwoL.textContent = "Low: " + dayTwoL + "°F";
   showDayTwoHumid.textContent = "Humidity: " + dayTwoHumid + "%";
   dayTwoIcon = data.list[1].weather[0].icon;
   var dayTwoImg = "http://openweathermap.org/img/wn/" + dayTwoIcon + ".png"
   showDayTwoIcon.setAttribute('src', dayTwoImg);

   showDayThreeDate.textContent = date;
   showDayThreeH.textContent = "High: " + dayThreeH + "°F";
   showDayThreeL.textContent = "Low: " + dayThreeL + "°F";
   showDayThreeHumid.textContent = "Humidity: " + dayThreeHumid + "%";
   dayThreeIcon = data.list[2].weather[0].icon;
   var dayThreeImg = "http://openweathermap.org/img/wn/" + dayThreeIcon + ".png"
   showDayThreeIcon.setAttribute('src', dayThreeImg);

   showDayFourDate.textContent = date;
   showDayFourH.textContent = "High: " + dayFourH + "°F";
   showDayFourL.textContent = "Low: " + dayFourL + "°F";
   showDayFourHumid.textContent = "Humidity: " + dayFourHumid + "%";
   dayFourIcon = data.list[3].weather[0].icon;
   var dayFourImg = "http://openweathermap.org/img/wn/" + dayFourIcon + ".png"
   showDayFourIcon.setAttribute('src', dayFourImg);

   showDayFiveDate.textContent = date;
   showDayFiveH.textContent = "High: " + dayFiveH + "°F";
   showDayFiveL.textContent = "Low: " + dayFiveL + "°F";
   showDayFiveHumid.textContent = "Humidity: " + dayFiveHumid + "%";
   dayFiveIcon = data.list[4].weather[0].icon;
   var dayFiveImg = "http://openweathermap.org/img/wn/" + dayFiveIcon + ".png"
   showDayFiveIcon.setAttribute('src', dayFiveImg);
   })
};


// API for geocoding https://opencagedata.com/






