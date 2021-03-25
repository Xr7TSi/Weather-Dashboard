// current weather variables
var currentTemp;
var currentHumid;
var currentWind;
var currentUv;

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

var location;
var date;

var searchBtn = $("#searchBtn");


// displays date
  setInterval(function(){
    date = moment().format('l');
    showDate.textContent = date;
});


 

// sets user input to var selectedCity, displays selected city, creates search history ul runs getWeather function
searchBtn.on('click', function () {
  selectedCity = $("#citySearch").val();

  // searchValues.push(selectedCity)
  showCity.textContent = selectedCity;

  // adds search values to display  
  var ul = document.createElement("ul");
  ul.textContent = selectedCity;
  // ul.addEventListener('click', () => showCity.textContent = ul.textContent);
  ul.addEventListener('click', function() {
    showCity.textContent = ul.textContent,
    selectedCity = showCity.textContent,
    getWeather();
  })

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
   currentTemp = data.main.temp.toFixed(0);
   currentHumid = data.main.humidity;
   currentWind = data.wind.speed.toFixed(0);
   currentIcon = data.weather[0].icon;
    console.log(data) 
   showCurrentTemp.textContent = "Temperature: " + currentTemp + "°F" ;
   showCurrentHumid.textContent = "humidity: " + currentHumid + "%";
   showCurrentWind.textContent = "Wind Speed: " + currentWind + "mph";
   showCurrentIcon.textContent = currentIcon;
 })

 


 // api for forecast
 var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?&units=imperial&appid=279105e2e4e9e82f777d589c68abec56&q=' + selectedCity;

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


   showDayOneDate.textContent = date;
   showDayOneH.textContent = "High: " + dayOneH + "°F";
   showDayOneL.textContent = "Low: " + dayOneL + "%";
   showDayOneHumid.textContent = "Humidity: " + dayOneHumid + "%";

   showDayTwoDate.textContent = date;
   showDayTwoH.textContent = "High: " + dayTwoH + "°F";
   showDayTwoL.textContent = "Low: " + dayTwoL + "%";
   showDayTwoHumid.textContent = "Humidity: " + dayTwoHumid + "%";

   showDayThreeDate.textContent = date;
   showDayThreeH.textContent = "High: " + dayThreeH + "°F";
   showDayThreeL.textContent = "Low: " + dayThreeL + "%";
   showDayThreeHumid.textContent = "Humidity: " + dayThreeHumid + "%";

   showDayFourDate.textContent = date;
   showDayFourH.textContent = "High: " + dayFourH + "°F";
   showDayFourL.textContent = "Low: " + dayFourL + "%";
   showDayFourHumid.textContent = "Humidity: " + dayFourHumid + "%";

   showDayFiveDate.textContent = date;
   showDayFiveH.textContent = "High: " + dayFiveH + "°F";
   showDayFiveL.textContent = "Low: " + dayFiveL + "%";
   showDayFiveHumid.textContent = "Humidity: " + dayFiveHumid + "%";
   })
  }



// getWeather api key = 4b37cdd7653dfc3582c009509a56e3eb
// getForecast api key = 279105e2e4e9e82f777d589c68abec56