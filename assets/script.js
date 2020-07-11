
// let long;
// let lat;
// let speed;
var button = document.querySelector(".submit");
var input = document.querySelector(".input_text");
var main = document.querySelector('#name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var weatherIcon = document.getElementById('#icon')


// button.addEventListener('click', function (name) {
//   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=eba23db029bb076b1335ac28a0b028bb')
//     .then(response => response.json())
//     .then(data =>
//     console.log(data)
//     // {
//     //   var tempValue = data['main']['temp'];
//     //   var nameValue = data['name'];
//     //   var descValue = data['weather'][0]['description'];
//     //   var iconValue = data['weather'][0]['icon'];
//     //   var windValue = data['wind']['speed'];
//     //   var humidityValue = data['main']['humidity'];
//     //   var convertedTemp = tempValue * 9 / 5 - 459.67;
//     //   // var convertedTempCelcius = (convertedTemp - 32) * 5/9; 
//     //   main.innerHTML = nameValue;
//     //   desc.innerHTML = descValue + " " + iconValue;
//     //   temp.innerHTML = "Temperature - " + Math.floor(convertedTemp) + "°F";
//     //   wind.innerHTML = "Wind Speed - " + windValue + "mph";
//     //   humidity.innerHTML = "Humidity - " + humidityValue + "%";
//     //   //   weatherIcon.innerHTML = iconValue;
//     //   input.value = "";

//     //   // fetch 5-day forcast
//     // //   return fetch('https://api.openweathermap.org/data/2.5/forecast?q='+input.value+'&appid=84b5a7bb34b700650b73c1f82fad0647')

//     // // }).then(response => response.json()) 
//     // // .then(userData => {
//     // //   console.log(userData);
// //     })
//     )
// //     // .catch(err => alert("Wrong city name!"))
// })

// fetching 2 API calls, current weather, 5-day forecast
button.addEventListener('click', function (name) {
  Promise.all([
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=eba23db029bb076b1335ac28a0b028bb'),
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input.value + '&appid=84b5a7bb34b700650b73c1f82fad0647')
  ]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    console.log(data);
  }).catch(function (error) {
    console.log(error);
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