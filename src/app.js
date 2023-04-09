function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayWeatherAspects(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let riseElement = document.querySelector("#sunrise");
  let setElement = document.querySelector("#sunset");
  let visElement = document.querySelector("#visibility");

  cTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(cTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  riseElement.innerHTML = formatTime(response.data.sys.sunrise * 1000);
  setElement.innerHTML = formatTime(response.data.sys.sunset * 1000);
  visElement.innerHTML = response.data.visibility / 1000;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherAspects);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function showFTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  cLink.classList.remove("active-temp");
  fLink.classList.add("active-temp");
  let fTemp = (cTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fTemp);
}

function showCTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  cLink.classList.add("active-temp");
  fLink.classList.remove("active-temp");
  temperatureElement.innerHTML = Math.round(cTemp);
}

let cTemp = null;

search("Edinburgh");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", showFTemp);

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", showCTemp);
