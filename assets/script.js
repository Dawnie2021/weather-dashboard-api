// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key

// bceb14bd5cd6a234ef51a73c1cda6012

// function getGeoWeather(lat, lon) {
fetch("http://api.openweathermap.org/geo/1.0/direct?appid=d91388f9a246c15c271361c3182b51d2&limit=1&q=Chicago")
.then(function (response) {
    return response.json();
})

 .then(function(data) {
    console.log(data);
 })


// function getCityGeoData() {
//     fetch()
//     .then(function(response) {
//         return response.json();

//     })
//     .then (function(data) {
//         console.log(data);
//         getGeoWeather(data.lat, data.lon);
//     })
// }
// getCityGeoData();