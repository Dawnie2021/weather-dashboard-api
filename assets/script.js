var cityInput = document.getElementById("city");
var searchButton = document.querySelector('.btn-primary');
var fiveDayForecastContainer = document.querySelector(".five-day-forecast")
var searchHistoryContainer = document.getElementById("searchHistory");
var currentWeatherContainer = document.getElementById("currentWeather");

// added a click event listener to the search button
searchButton.addEventListener('click, getCityGeoData');

// created a function to get the city data
function getCityGeoData() {
// get the city name from the input
    var cityName = cityInput.value

    // if the city name is not empty, then get the data 
    if (cityName) {
        fetch('https://api.openweathermap.org/geo/1.0/direct?appid=bceb14bd5cd6a234ef51a73c1cda6012&limit=1&q=' + cityName)
            .then(function (response) {
                return response.json();
            })
    
            .then(function (data) {
                getWeatherReport(cityName, data[0].lat, data[0].lon);
            });
        }

}

// get the current weather and the 5 day forecast
function getWeatherReport(cityName, lat, lon) {
    getCurrentWeather(cityName, lat, lon);
    getForecast(cityName, lat, lon);
    loadWeatherReportFromLocalStorage(cityName);
    addSearchHistory(cityName);
}

// get the current weather
function getCurrentWeather(cityName, lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/weather?appid=bceb14bd5cd6a234ef51a73c1cda6012&lat=' + lat + '&lon=' + lon + '&units=imperial')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            saveCurrentWeatherToLocalStorage(cityName, data);
        })
}

// get the 5 day forecast
function getForecast(cityName, lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?appid=bceb14bd5cd6a234ef51a73c1cda6012&lat=' + lat + '&lon=' + lon + '&units=imperial')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {

            saveForecastToLocalStorage(cityName, data);
        })
}

function saveForecastToLocalStorage(cityName, data) {
    // save the data to local storage
    localStorage.setItem(`${cityName}-forecast`, JSON.stringify(data));
}


// created a for loop to get the five days of weather data (Tutor helped with this part)
        for (let i = 0; i < data.list.length; i += 8) {
            var fiveDayCard = `
            <div class="card m-1">
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
   


   




