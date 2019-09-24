const weatherDiv = document.querySelector("[data-weather]");

function getWeatherData(url) {
    return fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        return data
    });
}

function createHeader(title) {
    let a = document.createElement("h3")
    a.innerHTML = title
    return a
}

// Append location name to the weather div
function addLocationName(location) {
    let header = createHeader("Location Name")
    let b = document.createElement("p")
    b.innerHTML += location.name
    weatherDiv.append(header,b)
}

// Add temperature to weather div
function addTemp(temp) {
    
    let header = createHeader("Temperature")
    let b = document.createElement("p")
    let farenheit = (temp.main.temp - 273.15) * (9 / 5) + 32;
    let farenheitRounded = farenheit.toFixed(2);
    b.innerHTML = farenheitRounded + " &#8457";
    weatherDiv.append(header, b);
}

// Add wind speed to weather div
function addWind(wind) {
    let header = createHeader("Wind Speed")
    let b = document.createElement("p")
    b.innerHTML = wind.wind.speed + " mph"
    weatherDiv.append(header, b)
}

// Add icon to weather div
function addIcon(data) {

    let header = createHeader("Icon")
    let b = document.createElement("img")

    let iconCode = data.weather[0].icon;

    function iconRetrieval(code) {
        // Use the icon code to get the icon using OpenWeatherMap.org
        const iconURL = `http://openweathermap.org/img/w/${code}.png`;
        b.src = iconURL
    }
    
    iconRetrieval(iconCode)

    weatherDiv.append(header, b)
}

// creates map showing lat long of weather info
function addMap(object) {

    let header = createHeader("Map")
    let b = document.createElement("iframe")
    b.setAttribute("height", "400")
    b.setAttribute("width", "400")

    let lat = object.coord.lat;
    let lon = object.coord.lon;
    const mapUrl = `http://maps.google.com/maps?q=${lat},${lon}&output=embed`;
    b.src = mapUrl

    weatherDiv.append(header, b)
}

function sunInfo(object) {
    // get sunrise and sunset info
    let a = createHeader("Sunrise")
    let b = document.createElement("p")

    let c = createHeader("Sunset")
    let d = document.createElement("p")
    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let dateString = mm + "/" + dd + "/" + yyyy + " ";

    let riseSec = object.sys.sunrise;
    let riseDate = new Date(riseSec * 1000);
    let riseTimeStr = riseDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    })

    let setSec = object.sys.sunset;
    let setDate = new Date(setSec * 1000);
    let setTimeStr = setDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    b.innerHTML = dateString + riseTimeStr
    d.innerHTML = dateString + setTimeStr

    weatherDiv.append(a,b,c,d)
}


function getWeather(location) {
    const URL =
    `https://api.openweathermap.org/data/2.5/weather?q=${location},US&appid=2f4580c1da2a1471787ee4c356181fd1`;

    getWeatherData(URL).then(function(response) {
        addLocationName(response);
        addTemp(response);
        addWind(response);
        addIcon(response);
        addMap(response);
        sunInfo(response);
    })
}

// Loads information on page load
getWeather('Kansas City')
