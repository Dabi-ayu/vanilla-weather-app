function displayTemperature(response) {
    console.log(response.data);
    let cityName = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let wind = Math.round(`${response.data.wind.speed}`);

    cityName.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
    windElement.innerHTML = `Wind: ${wind}km/h`;
    

    
    
}



let apiKey = "2o09becb3b08bea846ef5fd5t3834e89";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=New York&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);