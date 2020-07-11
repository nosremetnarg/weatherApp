
// let long;
// let lat;
// let speed;
var cities = JSON.parse(localStorage.getItem("cities")) || [];
var button = document.querySelector(".submit");
var input = document.querySelector(".input_text");
var main = document.querySelector('#name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var weatherIcon = document.getElementById('#icon')

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

    for (i = 0; i < data[1].list.length; i = i + 8) {
      console.log("list", data[1].list[i].main.temp_max);
      // console.log(i);
    }
    var tempValue = data[0]['main']['temp'];
    // var tempValue = data[1]['list']['main']['temp'];
    var nameValue = data[0]['name'];
    var descValue = data[0]['weather'][0]['description'];
    var iconValue = document.createElement('img')
    iconValue.setAttribute('src', "http://openweathermap.org/img/w/" + data[0]['weather'][0]['icon'] + ".png");
    // var iconValue = data[0]['weather'][0]['icon'];
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
  }).catch(function (error) {
    console.log(error);
    alert("Wrong city name!")
  });
});

// function getSearchItem() {
//   var searchTerm = document.querySelector('#searchCity').value
//   cityList(searchTerm)
//   searchFunction(searchTerm)
// }

// function cityList(searchTerm) {
//   var listItems = document.createElement("button");
//   listItems.setAttribute("class", "previousSearch");
//   listItems.addEventListener('click', function () {
//     var searchTool = $(this)[0].innerHTML;
//     searchFunction(searchTool);
//   })
//   var searchTermText = searchTerm;
//   listItems.textContent = searchTermText;
//   var historyList = document.querySelector(".history");
//   historyList.appendChild(listItems);
// };

// var saveCities = function() {
//   localStorage.setItem("cities", JSON.stringify(cities));
//   event.preventDefault();
// }

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