let now = new Date();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let weatherAppDate = document.querySelector("#current-date");
weatherAppDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
let weatherAppTime = document.querySelector("#current-time");
weatherAppTime.innerHTML = `${currentHour}:${currentMinutes}`;
if (currentMinutes < 10 && currentHour < 10) {
  weatherAppTime.innerHTML = `0${currentHour}:0${currentMinutes}`;
} else {
  weatherAppTime.innerHTML = `${currentHour}:${currentMinutes}`;
}

function showTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = `Wind:${wind} km/h`;
  let weatherDescription = response.data.weather[0].description;
  let currentWeatherDescription = document.querySelector(
    "#weather-description"
  );
  currentWeatherDescription.innerHTML = weatherDescription;
}

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityName.value;
  let apiKey = "0d800c588dc0c17f7124ec074768af05";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "7ac04cacb32dfce79e18c49de9fc3654";
  let apiUrl = `https:api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  let currentSearchButton = document.querySelector("#current-position-button");
  axios.get(apiUrl).then(showPosition);
}

function searchForCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function showPosition(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = cityName;
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWindSpeed = document.querySelector("#current-wind-speed");
  currentWindSpeed.innerHTML = `Wind:${wind} km/h`;
  let weatherDescription = response.data.weather[0].description;
  let currentWeatherDescription = document.querySelector(
    "#weather-description"
  );
  currentWeatherDescription.innerHTML = weatherDescription;
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", search);

let currentSearchButton = document.querySelector("#current-position-button");
currentSearchButton.addEventListener("click", searchForCurrentPosition);
