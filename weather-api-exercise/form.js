"use strict";

const form = document.querySelector("#cityForm")
const userInput = document.getElementById('cityName')
const clear = document.getElementById('clear')

form.addEventListener("submit", function(event){
    event.preventDefault()
    let userCity = userInput.value
    getWeather(userCity)
})

clear.addEventListener("click", function(event){
    event.preventDefault()
    userInput.value = ""
    weatherDiv.innerHTML = ""
})

