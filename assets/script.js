var cityInput = document.getElementById("city");
var searchButton = document.querySelector('.btn-primary');
var fiveDayForecastContainer = document.querySelector(".five-day-forecast")
var searchHistoryContainer = document.getElementById("searchHistory");
var currentWeatherContainer = document.getElementById("currentWeather");

// added a click event listener to the search button
searchButton.addEventListener('click, getCityGeoData');

// Created a function to get the latitude and longitude
function getGeoWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?appid=bceb14bd5cd6a234ef51a73c1cda6012&lat=' + lat + '&lon=' + lon + '&units=imperial')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {

            while(fiveDayForecastContainer.firstChild) {
                fiveDayForecastContainer.removeChild(fiveDayForecastContainer.firstChild);
            }

            // created a for loop to get the five days of weather data (Tutor helped with this part)
            for (let i = 0; i < data.list.length; i += 8) {
                var fiveDayCard = `
            <div class="card" style="width: 12rem; padding: 5px; margin: 5px;">
            <h5 class="card-title">${dayjs(data.list[i].dt_txt).format('M/D/YYYY')}</h5>
            <img src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" class="card-img-top" alt="...">
            <div class = "card-body" >
            <p class="card-text">Temp: ${data.list[i].main.temp}°F</p>
            <p class="card-text">Speed: ${data.list[i].wind.speed}MPH</p>
            <p class="card-text">Humidity: ${data.list[i].main.humidity}</p>
            </div >
            </div >
                `
                var fiveDayCardDiv = document.createElement('div')
                fiveDayCardDiv.innerHTML = fiveDayCard
                fiveDayForecastContainer.appendChild(fiveDayCardDiv)
            }
        })
}

// created a function to get the city data
function getCityGeoData() {

    cityName = city.value

    fetch('https://api.openweathermap.org/geo/1.0/direct?appid=bceb14bd5cd6a234ef51a73c1cda6012&limit=1&q=' + cityName)
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            getGeoWeather(data[0].lat, data[0].lon);
        });

    }