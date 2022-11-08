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
  let temperatureElement = document.querySelector("#degrees");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let temperatureFahrenheit = document.querySelector("#fahrenheit");
temperatureFahrenheit.addEventListener("click", convertTemperature);

let celsiusTemperature = null;

function convertTemperatureBack(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
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

function getForecast(coordinates) {
  let apiKey = "e947cb2640f1db92e6a19005bc43b435";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let feels = Math.round(response.data.main.feels_like);
  let feelsFahrenheit = Math.round((feels * 9) / 5 + 32);
  let place = response.data.name;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${place}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${celsiusTemperature}`;
  let h4 = document.querySelector("h4");
  h4.innerHTML = `Feels like ${feels}°C (${feelsFahrenheit}°F), ${description}`;
  let h5 = document.querySelector("h5");
  h5.innerHTML = `Humidity: ${humidity}% Wind speed: ${wind} m/s`;

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="row">
                <div class="col-sm-6 weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <div class="col-sm-3">
                  <span class="weather-forecast-temperature">${Math.round(
                    forecastDay.temp.day
                  )}</span>°C
                </div>
                <div class="col-sm-3"><img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" id="forecasticon"/></div>
              </div>
              `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
