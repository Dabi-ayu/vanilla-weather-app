function formatDate(timestamp) {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    



    return ` ${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);  
    let day = date.getDay();
    
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


    return days[day];
}


function cityForecast(forecastCity) {
    
    let apiKey = "2o09becb3b08bea846ef5fd5t3834e89";
    let urlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${forecastCity}&key=${apiKey}&units=metric`;


    axios.get(urlForecast).then(displayForecast);

}

function displayTemperature(response) {
    let cityName = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let wind = Math.round(`${response.data.wind.speed}`);
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    celciusTemperature = response.data.temperature.current;

    cityName.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(celciusTemperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
    windElement.innerHTML = `Wind: ${wind}km/h`;
    dateElement.innerHTML = formatDate(response.data.temperature.time * 1000);
    iconElement.setAttribute("src", `${response.data.condition.icon_url}`);


    cityForecast(response.data.city);
    
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    searchCity(searchInput.value);
    
    
}

function searchCity(city) {
    let apiKey = "2o09becb3b08bea846ef5fd5t3834e89";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}


function farenheitLink(event) {
    event.preventDefault();
    celcuis.classList.remove("active");
    farenheit.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    let farenheitValue = (celciusTemperature * 9)/ 5 + 32;
    temperatureElement.innerHTML = Math.round(farenheitValue);
}

function celcuisLink(event) {
    event.preventDefault();
    celcuis.classList.add("active");
    farenheit.classList.remove("active");
     let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.daily;
    let forecastHTML = `<div class="row">`; 


    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            let max = Math.round(forecastDay.temperature.maximum);
            let min = Math.round(forecastDay.temperature.minimum);

            let day = formatDay(forecastDay.time);


            forecastHTML = forecastHTML + `<div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                  alt="forecast icon"
                  width="36"
                  id="forecast-icon"
                />
                <div class="forecast-temperature">
                  <span class="forecast-max" id="forecast-max">${max}°</span>
                  <span class="forecast-min" id="forecast-min">${min}°</span>
                </div>
              </div>`;
        }
    });
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

}


let celciusTemperature = null;

searchCity("New York");

    
let farenheit = document.querySelector("#farenheit-unit");
farenheit.addEventListener("click", farenheitLink);

let celcuis = document.querySelector("#degree-unit");
celcuis.addEventListener("click", celcuisLink);

let searchElement = document.querySelector("#search-form");
searchElement.addEventListener("submit", search);

