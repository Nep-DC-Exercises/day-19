const weatherDiv = document.querySelector("[data-weather]");
const URL =
    "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,US&appid=2f4580c1da2a1471787ee4c356181fd1";
const loca = document.getElementById("location");
const temp = document.getElementById("temp");
const wind = document.getElementById("windSpeed");
const icon = document.getElementById("icon");
const rise = document.getElementById("sunRise");
const set = document.getElementById("sunSet");
const map = document.getElementById("map");

// Append location name to the weather div
function addLocationName(object) {
    fetch(object)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            loca.innerHTML = data.name;
        });
}

// Add temperature to weather div
function addTemp(object) {
    fetch(object)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let farenheit = (data.main.temp - 273.15) * (9 / 5) + 32;
            let farenheitRounded = farenheit.toFixed(2);
            temp.innerHTML = farenheitRounded + " &#8457";
        });
}

// Add wind speed to weather div
function addWind(object) {
    fetch(object)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            wind.innerHTML = data.wind.speed;
        });
}

// Add icon to weather div
function addIcon(object) {
    fetch(object)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let iconCode = data.weather[0].icon;
            return iconCode;
        })
        .then(function(iconCode) {
            // Use the icon code to get the icon using OpenWeatherMap.org
            const iconURL = `http://openweathermap.org/img/w/${iconCode}.png`;
            return iconURL;
        })
        .then(function(iconURL) {
            icon.src = iconURL;
        });
}

// creates map showing lat long of weather info
function addMap(object) {
    // get lat and long coordinates
    fetch(object)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            let coordinates = [lat, lon];
            return coordinates;
        })
        .then(function(coordinates) {
            let lat = coordinates[0];
            let lon = coordinates[1];

            // Use the Lat/Long to create a map
            const mapUrl = `http://maps.google.com/maps?q=${lat},${lon}&output=embed`;
            return mapUrl;
        })
        .then(function(mapUrl) {
            // create iframe and set attributes
            map.src = mapUrl;
        });
}

function sunInfo(object, timeOfDay) {
    // get sunrise and sunset info
    fetch(object)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, "0");
            let mm = String(today.getMonth() + 1).padStart(2, "0");
            let yyyy = today.getFullYear();
            let dateString = mm + "/" + dd + "/" + yyyy + " ";

            let riseSec = data.sys.sunrise;
            let riseDate = new Date(riseSec * 1000);
            let riseTimeStr = riseDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            rise.innerHTML += dateString + riseTimeStr;

            let setSec = data.sys.sunset;
            let setDate = new Date(setSec * 1000);
            let setTimeStr = setDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

            set.innerHTML += dateString + setTimeStr;
        });
}

// Function calls
addTemp(URL);
addIcon(URL);
addMap(URL);
sunInfo(URL);
addWind(URL);
addLocationName(URL);
