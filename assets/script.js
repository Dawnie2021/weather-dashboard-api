// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key

// bceb14bd5cd6a234ef51a73c1cda6012




function getGeoWeather(lat, lon) {


fetch(api.openweathermap.org/data/2.5/forecast?appid=bceb14bd5cd6a234ef51a73c1cda6012lat=' + lat + '&lon=' + lon'&units=imperial')
    .then(function(response) {
        return response.json();

    })
    .then (function(data) {
        console.log(data);
        getGeoWeather(data.lat, data.lon);
    })
}


function getCityGeoData() {
fetch("http://api.openweathermap.org/geo/1.0/direct?appid=bceb14bd5cd6a234ef51a73c1cda6012&limit=1&q=Rochester")
    .then(function (response) {
        return response.json();
    })

    .then(function (data) {
        console.log(data);
        getGeoWeather(data[0].lat, data[0].lon);
    })

}


getCityGeoData();