function showTime() {
  let now = new Date();
  let day = now.getDay();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentTime = `${days[day]} ${hours}:${minutes}`;
  return currentTime;
}
let time = document.querySelector("h2");
time.innerHTML = showTime();

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input");
  let name = document.querySelector("h1");
  name.innerHTML = `${city.value}`;
  let apiKey = "059557451cbb9d4b2023cfed9849282d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", showCity);

function convertTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "79";
}

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", convertTemperature);

function convertTemperatureBack(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "26";
}

let temperatureCelsius = document.querySelector("#celsius");
temperatureCelsius.addEventListener("click", convertTemperatureBack);

function showLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "059557451cbb9d4b2023cfed9849282d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocationWeather);
}

let locationWeather = document.querySelector("#location");
locationWeather.addEventListener("click", currentWeather);

function showWeather(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let feels = Math.round(response.data.main.feels_like);
  let place = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${place}`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperature}°C (feels like ${feels}°C), ${description}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `Humidity: ${humidity}% Wind speed: ${wind} m/s`;
}
