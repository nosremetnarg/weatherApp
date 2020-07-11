var cities = JSON.parse(localStorage.getItem("cities")) || [];
const key = "d7de03f041d87b24110dc204b6392170"
var currentTime = moment().format("dddd MMMM Do YYYY, h:mm a");
var currentTimeInt = moment().hour();
​
$("#currentDay").text(currentTime);
const currentDay = document.getElementById('currentDay');
​
for (let index = 0; index < cities.length; index++) {
    cityList(cities[index])    
};
​
// reach into the html
// grab the search button
const searchButton = document.querySelector('#searchButton'); // js select
// const searchBtn = $('#searchButton'); // jq select
// listen for a click
// then fire our getSearchTerm function
searchButton.addEventListener('click', getSearchTerm) // js event listener
// searchBtn.on('click', getSearchTerm) // jq event listner
// respective one liners
// document.querySelector('#searchButton').addEventListener('click', getSearchTerm)
// $('#searchButton').on('click', getSearchTerm)
​
​
// updateTime
function updateTime() {
    const now = moment();
    const humanReadable = now.local().format("dddd, MMMM Do YYYY, h:mm A");
    currentDay.textContent = humanReadable;
}
setInterval(updateTime, 60000);
updateTime();
​
​
function getSearchTerm() {
    var searchTerm = document.querySelector('#searchCity').value
    cityList(searchTerm)
    searchFunction(searchTerm)
    // var cities = JSON.parse(localStorage.getItem(cities, "#searchCity"));
    // localStorage.setItem(searchTerm, JSON.stringify(cities, "#searchCity"));
}
​
function cityList(searchTerm) {
    var listItems = document.createElement("button");
    listItems.setAttribute("class", "searchPrevious");
    listItems.addEventListener('click', function () {
        var searchTool = $(this)[0].innerHTML;
        searchFunction(searchTool);
    })
    //button.addEventListener('click', searchFunction);
    //listItems.classList.add()
    var searchTermText = searchTerm;
    listItems.textContent = searchTermText;
    var historyList = document.querySelector(".history");
    historyList.appendChild(listItems);
    //call searchFunction here
    //searchFunction();
};
​
var saveCities = function () {
    localStorage.setItem("cities", JSON.stringify(cities));
event.preventDefault();
};
​
function searchFunction(searchTerm) {
 //   var searchTerm = document.querySelector('#searchCity').value
    cities.push(searchTerm)
   saveCities();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=d7de03f041d87b24110dc204b6392170"
    fetch(apiUrl)
​
        .then(function (response) {
            return response.json().then(function (data) {
                console.log(data);
                // --- put this data somewhere on the screen----
                // get all the data we actually want out of the data obj assign those to variable
                const cityName = data.name;
                const dateOfWeather = data.dt; // convert from utc
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const tempHigh = data.main.temp_max;
                const tempLow = data.main.temp_min;
                
                // grab the area of the html we want to put that data
                var cityNameHtml = document.querySelector("#cityName");
                var dateOfWeatherHTML = document.querySelector("#date");
                var humidityHTML = document.querySelector("#humidity");
                var windSpeedHTML = document.querySelector("#windSpeed");
                var tempHighHTML = document.querySelector("#tempHigh");
                var tempLowHTML = document.querySelector("#tempLow");
                var uvIndex = document.querySelector("#uvIndex");
                // plug our data into those areas
                cityNameHtml.innerHTML = "City: " + cityName;
                dateOfWeatherHTML.innerHTML = "Date: " + dateOfWeather;
                humidityHTML.innerHTML = "Humidity: " + humidity;
                windSpeedHTML.innerHTML = "Wind Speed: " + windSpeed;
                tempHighHTML.innerHTML = "High Of: " + tempHigh;
                tempLowHTML.innerHTML = "Low Of: " + tempLow;
            })
        })
}