var cityInput = document.getElementById("city");
var searchButton = document.querySelector('.btn-primary');
var fiveDayForecastContainer = document.querySelector(".five-day-forecast")
var searchHistoryContainer = document.getElementById("searchHistory");
var currentWeatherContainer = document.getElementById("currentWeather");

// Created a function to get the latitude and longitude
function getCityGeoData(event) {
    event.preventDefault();
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

function saveCurrentWeatherToLocalStorage(cityName, data) {
    // save the data to local storage
    console.log(data)
    localStorage.setItem(`${cityName}-current`, JSON.stringify(data));
}

// retrieve the data from local storage and display it
function loadWeatherReportFromLocalStorage(cityName) {
    loadForecastFromLocalStorage(cityName)
    loadCurrentWeatherFromLocalStorage(cityName)
}

function loadForecastFromLocalStorage(cityName) {
    // clear the 5 day forecast container
    clearWeeklyWeather();

    // retrieve the data from local storage
    data = JSON.parse(localStorage.getItem(`${cityName}-forecast`));

    // display the data if it exists
    if(data) {

        // created a for loop to get the five days of weather data (Tutor helped with this part)
        for (let i = 0; i < data.list.length; i += 8) {
            var fiveDayCard = `
            <div class="card m-1 p-3">
                <h5 class="card-title">${dayjs(data.list[i].dt_txt).format('M/D/YYYY')}</h5>
                <img src="https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png" class="mx-auto d-block w-50" alt="...">
                <div class = "card-body" >
                    <p class="card-text">Temp: ${data.list[i].main.temp}°F</p>
                    <p class="card-text">Speed: ${data.list[i].wind.speed}MPH</p>
                    <p class="card-text">Humidity: ${data.list[i].main.humidity}%</p>
                </div >
            </div >
                `
            var fiveDayCardDiv = document.createElement('div')
            fiveDayCardDiv.innerHTML = fiveDayCard
            fiveDayForecastContainer.appendChild(fiveDayCardDiv)
        }
    }
}

function loadCurrentWeatherFromLocalStorage(cityName) {
    console.log(cityName)
    // retrieve the data from local storage
    data = JSON.parse(localStorage.getItem(`${cityName}-current`));

    if (!data) return;

    console.log(data)
// added variables to display date
    var date = new Date(data.dt * 1000);
    var options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    var formattedDate = date.toLocaleString('en-US', options);
// created a variable to display current weather
    var currentWeatherCard = `
    <div class="card">
    <h4 class="card-title">${data.name}</h4>
    <h5 class="card-title">${formattedDate}</h5>
    Temp ${data.main.temp}<br>
    Wind ${data.wind.speed}<br>
    Humidity ${data.main.humidity}
    </div>`

    currentWeatherContainer.innerHTML = currentWeatherCard
}

// to get seach history
function addSearchHistory(cityName) {
    var searchHistoryLink = `<button class="btn btn-info w-100 p-2 mb-1" type="button" onclick="loadWeatherReportFromLocalStorage('${cityName}')">${cityName}</button>`
    var searchHistoryLinkDiv = document.createElement('div')
    searchHistoryLinkDiv.innerHTML = searchHistoryLink
    searchHistoryContainer.appendChild(searchHistoryLinkDiv)
}

// clear the 5 day forecast container
function clearWeeklyWeather() {
    while(fiveDayForecastContainer.firstChild) {
        fiveDayForecastContainer.removeChild(fiveDayForecastContainer.firstChild);
    }
}

// added a click event listener to the search button
searchButton.addEventListener('click', getCityGeoData);