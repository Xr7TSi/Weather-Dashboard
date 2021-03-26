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

// geolocation variables
var geoLat;
var geoLng;

var date;

var searchBtn = $("#searchBtn");


// displays current date
  setInterval(function(){
    date = moment().format('l');
    showDate.textContent = date;
});

// displays forecast 1 date
setInterval(function(){
  date = moment().add(1, 'days').format('l'); 
  showDayOneDate.textContent = date;
});

// displays forecast 2 date
setInterval(function(){
  date = moment().add(2, 'days').format('l');
  showDayTwoDate.textContent = date;
});

// displays forecast 2 date
setInterval(function(){
  date = moment().add(3, 'days').format('l');
  showDayThreeDate.textContent = date;
});

// displays forecast 2 date
setInterval(function(){
  date = moment().add(4, 'days').format('l');
  showDayFourDate.textContent = date;
});

// displays forecast 2 date
setInterval(function(){
  date = moment().add(5, 'days').format('l');
  showDayFiveDate.textContent = date;
});








// pulls last selected city from local storage on page load and displays data for last selected city
selectedCityLs = localStorage.getItem("searchedCity");

if (selectedCityLs) {
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
  // converts selectedCity into lat and long coordinates
  var geocodeUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + selectedCity + "&key=2098cd8a74444263890876ca7ea94a84"
  fetch(geocodeUrl) 
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    geoLat = data.results[0].geometry.lat.toFixed(6);
    geoLng = data.results[0].geometry.lng.toFixed(6);
    
    var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + geoLat + "&lon=" + geoLng + "&appid=802248b8a798a6e1e59be31a4560e2ec";
    
   fetch(oneCallUrl) 
   .then(function (response) {
     return response.json();
   })
   .then(function (data) {
       //  sets variables for current weather data plus coordinates for use in uv index
    currentTemp = data.current.temp.toFixed(0);
    currentHumid = data.current.humidity;
    currentWind = data.current.wind_speed.toFixed(0);
    currentIcon = data.current.weather[0].icon;
    currentUv = data.current.uvi.toFixed(1)
    
    //displays current weather data 
    showCurrentTemp.textContent = "Temperature: " + currentTemp + "°F" ;
    showCurrentHumid.textContent = "Humidity: " + currentHumid + "%";
    showCurrentWind.textContent = "Wind Speed: " + currentWind + "mph";
    showCurrentUv.textContent= "UV Index " + currentUv;

   // displays current weather icon 
   var iconImg = "http://openweathermap.org/img/wn/" + currentIcon + ".png"
   showCurrentIcon.setAttribute('src', iconImg);
    
      //  determines uv index display background color
    if (currentUv < 3) {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: rgb(37, 200, 37)");
    } else if (currentUv < 6) {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: yellow");
    } else {
      document.getElementById("showCurrentUv").setAttribute("style","background-color: red");
    };

      // sets weather data as variables from api call
    dayOneH = data.daily[0].temp.max.toFixed(0);
    dayOneL = data.daily[0].temp.min.toFixed(0);
    dayOneHumid = data.daily[0].humidity;
    dayOneIcon = data.daily[0].weather[0].icon;
    var dayOneImg = "http://openweathermap.org/img/wn/" + dayOneIcon + ".png"

    dayTwoH = data.daily[1].temp.max.toFixed(0);
    dayTwoL = data.daily[1].temp.min.toFixed(0);
    dayTwoHumid = data.daily[1].humidity;
    dayTwoIcon = data.daily[1].weather[0].icon;
    var dayTwoImg = "http://openweathermap.org/img/wn/" + dayTwoIcon + ".png"

    dayThreeH = data.daily[2].temp.max.toFixed(0);
    dayThreeL = data.daily[2].temp.min.toFixed(0);
    dayThreeHumid = data.daily[2].humidity;
    dayThreeIcon = data.daily[2].weather[0].icon;
    var dayThreeImg = "http://openweathermap.org/img/wn/" + dayThreeIcon + ".png"

    dayFourH = data.daily[3].temp.max.toFixed(0);
    dayFourL = data.daily[3].temp.min.toFixed(0);
    dayFourHumid = data.daily[3].humidity;
    dayFourIcon = data.daily[3].weather[0].icon;
    var dayFourImg = "http://openweathermap.org/img/wn/" + dayFourIcon + ".png"

    dayFiveH = data.daily[4].temp.max.toFixed(0);
    dayFiveL = data.daily[4].temp.min.toFixed(0);
    dayFiveHumid = data.daily[4].humidity;
    dayFiveIcon = data.daily[4].weather[0].icon;
    var dayFiveImg = "http://openweathermap.org/img/wn/" + dayFiveIcon + ".png"
    
    //  displays weather data
    
    showDayOneH.textContent = "High: " + dayOneH + "°F";
    showDayOneL.textContent = "Low: " + dayOneL + "°F";
    showDayOneHumid.textContent = "Humidity: " + dayOneHumid + "%";
    showDayOneIcon.setAttribute('src', dayOneImg);

    showDayTwoH.textContent = "High: " + dayTwoH + "°F";
    showDayTwoL.textContent = "Low: " + dayTwoL + "°F";
    showDayTwoHumid.textContent = "Humidity: " + dayTwoHumid + "%";
    showDayTwoIcon.setAttribute('src', dayTwoImg);

    showDayThreeH.textContent = "High: " + dayThreeH + "°F";
    showDayThreeL.textContent = "Low: " + dayThreeL + "°F";
    showDayThreeHumid.textContent = "Humidity: " + dayThreeHumid + "%";
    showDayThreeIcon.setAttribute('src', dayThreeImg);

    showDayFourH.textContent = "High: " + dayFourH + "°F";
    showDayFourL.textContent = "Low: " + dayFourL + "°F";
    showDayFourHumid.textContent = "Humidity: " + dayFourHumid + "%";
    showDayFourIcon.setAttribute('src', dayFourImg);

    showDayFiveH.textContent = "High: " + dayFiveH + "°F";
    showDayFiveL.textContent = "Low: " + dayFiveL + "°F";
    showDayFiveHumid.textContent = "Humidity: " + dayFiveHumid + "%";
    showDayFiveIcon.setAttribute('src', dayFiveImg);
   });
  });
};

  