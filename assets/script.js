
let long;
let lat;
let speed;
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var button = document.querySelector(".submit");
var input = document.querySelector(".input_text");
var main = document.querySelector('#name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var weatherIcon = document.getElementById('#icon');
var clearButton = document.querySelector(".clearStorage");
// var dayIcon1 = document.querySelector(".dayIcon1");
// var dayOneTemp = document.getElementById('.dayOneTemp')
var listTemp1 = document.getElementById("#list-todo1");
var dayOneTempValue;
var currentTime = moment().format("dddd MMMM Do YYYY, h:mm a");
var currentTimeInt = moment().hour();
$("#currentDay").text(currentTime);
const currentDay = document.getElementById('currentDay');

// time
function updateTime() {
  const now = moment();
  const humanReadable = now.local().format("dddd, MMMM Do YYYY, h:mm A");
  currentDay.textContent = humanReadable;
}
setInterval(updateTime, 60000);
updateTime();

// local weather
var currentWeather = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      speed = position.coords.speed;

      var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=84b5a7bb34b700650b73c1f82fad0647";

      fetch(queryURL)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          var tempValue = data[0]['main']['temp'];
          var nameValue = data[0]['name'];
          var descValue = data[0]['weather'][0]['description'];
          var iconValue = document.createElement('img')
          iconValue.setAttribute('src', "http://openweathermap.org/img/w/" + data[0]['weather'][0]['icon'] + ".png");
          var windValue = data[0]['wind']['speed'];
          var humidityValue = data[0]['main']['humidity'];
          var convertedTemp = tempValue * 9 / 5 - 459.67;
          // var convertedTempCelcius = (convertedTemp - 32) * 5/9; 
          main.innerHTML = nameValue;
          desc.innerHTML = descValue;
          desc.appendChild(iconValue);
          temp.innerHTML = "Temperature - " + Math.floor(convertedTemp) + "°F";
          wind.innerHTML = "Wind Speed - " + windValue + "mph";
          humidity.innerHTML = "Humidity - " + humidityValue + "%";
          //   weatherIcon.innerHTML = iconValue;
          input.value = "";

        });
    });
  }
}
currentWeather();

// local storage
for (let index = 0; index < cities.length; index++) {
  cityList(cities[index])
};
const searchButton = document.querySelector('#searchButton'); // js select

searchButton.addEventListener('click', getSearchTerm) // js event listener

function getSearchTerm() {
  var searchTerm = document.querySelector('#searchCity').value
  cityList(searchTerm)
  searchFunction(searchTerm)
}
function cityList(searchTerm) {
  var listItems = document.createElement("button");
  listItems.setAttribute("class", "searchPrevious");
  listItems.addEventListener('click', function () {
    var searchTool = $(this)[0].innerHTML;
    searchFunction(searchTool);
  })
  var searchTermText = searchTerm;
  listItems.textContent = searchTermText;
  var historyList = document.querySelector(".history");
  historyList.appendChild(listItems);
};

var saveCities = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
  event.preventDefault();
};
function searchFunction(searchTerm) {
  // var searchTerm = document.querySelector('#searchCity').value
  cities.push(searchTerm)
  saveCities();
};

// clear recent searches
clearButton.addEventListener('click', function () {
  localStorage.clear();
  $('#clearStorage').empty();

})
// searching for single day and 5-day forecast
button.addEventListener('click', function (name) {
  Promise.all([
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=eba23db029bb076b1335ac28a0b028bb'),
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input.value + '&appid=84b5a7bb34b700650b73c1f82fad0647')
  ]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(data => {
    console.log(data);
    console.log(localStorage);

    // for (i = 0; i < data[1].list.length; i = i + 8) {
    //   console.log("list", data[1].list[i].main.temp_max);
    //   // console.log(i);
    //   dayOneTempValue = data[1].list[0].main.temp_max;
    // }

    var tempValue = data[0]['main']['temp'];
    var nameValue = data[0]['name'];
    var descValue = data[0]['weather'][0]['description'];
    var iconValue = document.createElement('img')
    iconValue.setAttribute('src', "http://openweathermap.org/img/w/" + data[0]['weather'][0]['icon'] + ".png");
    var windValue = data[0]['wind']['speed'];
    var humidityValue = data[0]['main']['humidity'];
    var convertedTemp = tempValue * 9 / 5 - 459.67;
    // var convertedTempCelcius = (convertedTemp - 32) * 5/9; 
    main.innerHTML = nameValue;
    desc.innerHTML = descValue;
    desc.appendChild(iconValue);
    temp.innerHTML = "Temperature - " + Math.floor(convertedTemp) + "°F";
    wind.innerHTML = "Wind Speed - " + windValue + "mph";
    humidity.innerHTML = "Humidity - " + humidityValue + "%";
    //   weatherIcon.innerHTML = iconValue;
    input.value = "";

    // 5 day forcast section 
    // day 1 forecast
    var day1 = (data[1].list[4].dt_txt)
    var day1Formatted = moment(day1).format('dddd');
    var tempOneF = (data[1].list[4].main.temp - 273.15) * 1.8 + 32;
    var tempOne = tempOneF.toFixed(1);
    var iconValue1 = document.createElement('img')
    iconValue1.setAttribute('src', "http://openweathermap.org/img/w/" + data[1].list[4]['weather'][0]['icon'] + ".png");
    $("#day1").html("<h5>" + day1Formatted + "</h5>");
    $("#day1").append("<p>" + "Temp: " + tempOne + "°F </p>");
    $("#day1").append("<p>" + "Humidity: " + data[1].list[4].main.humidity + "% </p>");
    $('#day1').append("<p>" + "Wind Speed: " + Math.floor(data[1].list[4].wind.speed) + "mph");
    $('#day1').append(iconValue1);

    // day 2 forecast
    var day2 = data[1].list[12].dt_txt;
    var day2Formatted = moment(day2).format('dddd');
    var tempTwoF = (data[1].list[12].main.temp - 273.15) * 1.8 + 32;
    var tempTwo = tempTwoF.toFixed(1);
    var iconValue2 = document.createElement('img')
    iconValue2.setAttribute('src', "http://openweathermap.org/img/w/" + data[1].list[12]['weather'][0]['icon'] + ".png");
    $("#day2").html("<h5>" + day2Formatted + "</h5>");
    $("#day2").append("<p>" + "Temp: " + tempTwo + "°F </p>");
    $("#day2").append("<p>" + "Humidity: " + data[1].list[12].main.humidity + "% </p>");
    $('#day2').append("<p>" + "Wind Speed: " + Math.floor(data[1].list[12].wind.speed) + "mph");
    $('#day2').append(iconValue2);

    // day 3 forecast
    var day3 = data[1].list[20].dt_txt;
    var day3Formatted = moment(day3).format('dddd');
    var tempThreeF = (data[1].list[20].main.temp - 273.15) * 1.8 + 32;
    var tempThree = tempThreeF.toFixed(1);
    var iconValue3 = document.createElement('img')
    iconValue3.setAttribute('src', "http://openweathermap.org/img/w/" + data[1].list[20]['weather'][0]['icon'] + ".png");
    $("#day3").html("<h5>" + day3Formatted + "</h5>");
    $("#day3").append("<p>" + "Temp: " + tempThree + "°F </p>");
    $("#day3").append("<p>" + "Humidity: " + data[1].list[20].main.humidity + "% </p>");
    $('#day3').append("<p>" + "Wind Speed: " + Math.floor(data[1].list[20].wind.speed) + "mph");
    $('#day3').append(iconValue3);

    // day 4 forecast
    var day4 = data[1].list[28].dt_txt;
    var day4Formatted = moment(day4).format('dddd');
    var tempFourF = (data[1].list[20].main.temp - 273.15) * 1.8 + 32;
    var tempFour = tempFourF.toFixed(1);
    var iconValue4 = document.createElement('img')
    iconValue4.setAttribute('src', "http://openweathermap.org/img/w/" + data[1].list[28]['weather'][0]['icon'] + ".png");
    $("#day4").html("<h5>" + day4Formatted + "</h5>");
    $("#day4").append("<p>" + "Temp: " + tempFour + "°F </p>");
    $("#day4").append("<p>" + "Humidity: " + data[1].list[20].main.humidity + "% </p>");
    $('#day4').append("<p>" + "Wind Speed: " + Math.floor(data[1].list[28].wind.speed) + "mph");
    $('#day4').append(iconValue4);

    // day 5 forecast
    var day5 = data[1].list[36].dt_txt;
    var day5Formatted = moment(day5).format('dddd');
    var tempFiveF = (data[1].list[20].main.temp - 273.15) * 1.8 + 32;
    var tempFive = tempFiveF.toFixed(1);
    var iconValue5 = document.createElement('img')
    iconValue5.setAttribute('src', "http://openweathermap.org/img/w/" + data[1].list[36]['weather'][0]['icon'] + ".png");
    $("#day5").html("<h5>" + day5Formatted + "</h5>");
    $("#day5").append("<p>" + "Temp: " + tempFive + "°F </p>");
    $("#day5").append("<p>" + "Humidity: " + data[1].list[36].main.humidity + "% </p>");
    $('#day5').append("<p>" + "Wind Speed: " + Math.floor(data[1].list[36].wind.speed) + "mph");
    $('#day5').append(iconValue5);

  }).catch(function (error) {
    console.log(error);
    alert("Wrong city name!")
  });
});

        // function setIcons(icon, iconID) {
        //   const skycons = new skycons({color: "white"});
        // }
          // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(position => {
        //         console.log(position);
        //         long = position.coords.longitude;
        //         lat = position.coords.latitude;
        //         speed = position.coords.speed;

        //         const proxy = 'https://cors-anywhere.herokuapp.com/';
        //         const api = `${proxy}https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={84b5a7bb34b700650b73c1f82fad0647}`;
        //         fetch(api)
        //             .then(response => {
        //                 return response.json();
        //             })
        //             .then(data => {
        //                 console.log(data);
        //             });
        //     });
        // }


        // working for single day weather search
// button.addEventListener('click', function (name) {
//   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=eba23db029bb076b1335ac28a0b028bb')
//     .then(response => response.json())
//     .then(data => {
//     console.log(data)
//     // {
//       var tempValue = data['main']['temp'];
//       var nameValue = data['name'];
//       var descValue = data['weather'][0]['description'];
//       var iconValue = document.createElement('img')
//       iconValue.setAttribute('src', "http://openweathermap.org/img/w/" + data['weather'][0]['icon'] + ".png");
//       var windValue = data['wind']['speed'];
//       var humidityValue = data['main']['humidity'];
//       var convertedTemp = tempValue * 9 / 5 - 459.67;
//       // var convertedTempCelcius = (convertedTemp - 32) * 5/9; 
//       main.innerHTML = nameValue;
//       desc.innerHTML = descValue;
//       desc.appendChild(iconValue);
//       temp.innerHTML = "Temperature - " + Math.floor(convertedTemp) + "°F";
//       wind.innerHTML = "Wind Speed - " + windValue + "mph";
//       humidity.innerHTML = "Humidity - " + humidityValue + "%";
//       //   weatherIcon.innerHTML = iconValue;
//       input.value = "";
//     })


//     .catch(err => alert("Wrong city name!"));
// })