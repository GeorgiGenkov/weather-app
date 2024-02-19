// API key and URL
const apiKey = "bc16d6c8e2bccc4383d2228f4c6305e1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherInfo = document.querySelector(".weather");
const errorInfo = document.querySelector(".error-msg");


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    const cityField = document.querySelector(".city");
    const temperature = document.querySelector(".temp");
    const humidity = document.querySelector(".humidity");
    const windSpeed = document.querySelector(".wind");
    const weatherIcon = document.querySelector(".weatherIcon");

    // Error message is shown to the user if their input is a non-existing city name
    if(response.status == 404){
        const message = `An error has occurred: ${response.status}`;
        cityField.textContent = "City";
        temperature.textContent = "°c";
        humidity.textContent = "%";
        windSpeed.textContent = "km/h";
        weatherIcon.src = "./img/Clear.png";

        weatherInfo.style.display = "none";
        errorInfo.style.display = "block";

        throw new Error(message);
    }
    // If user's input is an existing city name - weather details are displayed
    else{
        let data = await response.json();

        cityField.textContent= data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°c`;
        humidity.textContent = `${data.main.humidity} %`;
        windSpeed.textContent = `${data.wind.speed.toFixed(1)} km/h`;
        weatherIcon.src = `./img/${data.weather[0].main}.png`;

        weatherInfo.style.display = "block";
        errorInfo.style.display = "none";
    }   
}


searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
})
