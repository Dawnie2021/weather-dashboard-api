
/* <div class="card" style="width: 18rem;">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">Date</li>
                      <li class="list-group-item">Temp</li>
                      <li class="list-group-item">Wind</li>
                      <li class="list-group-item">Humidity</li>
                    </ul>
                  </div> */


function getGeoWeather(lat, lon) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?appid=bceb14bd5cd6a234ef51a73c1cda6012&lat=' + lat + '&lon=' + lon+ '&units=imperial')
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            for (var result of data.list) {
            console.log(result.main.temp);
            console.log(result.wind.speed);
            console.log(result.main.humidity);
            // // console.log(result);
            }
            
//             var cardEl = document.createElement('div');
//             cardEl.classList.add('card');
//             var listGroup = document.createElement('div');
//             listGroup.classList.add(list-group);
//             var liOne = document.createElement('li');
//             liOne.classList.add(list-one);
//             var liTwo = document.createElement('li');
//             liOne.classList.add(list-two);
//             var liThree = document.createElement('li');
//             liOne.classList.add(list-three);
//             var liFour = document.createElement('li');
//             liOne.classList.add(list-four);
//             })
})
};
function getCityGeoData() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?appid=bceb14bd5cd6a234ef51a73c1cda6012&limit=1&q=rochester')
        .then(function (response) {
            return response.json();
        })

        .then(function (data) {
            console.log(data);
            getGeoWeather(data[0].lat, data[0].lon);
           
            
        })

}

getCityGeoData();
