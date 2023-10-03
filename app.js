const apiKey = "bc16d6c8e2bccc4383d2228f4c6305e1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    const cityField = document.querySelector(".city");
    const temperature = document.querySelector(".temp");
    const humidity = document.querySelector(".humidity");
    const windSpeed = document.querySelector(".wind");
    const weatherIcon = document.querySelector(".weatherIcon");

    if(response.status == 404){
        const message = `An error has occured: ${response.status}`;
        cityField.textContent = "City name not found";
        temperature.textContent = "°c";
        humidity.textContent = "%";
        windSpeed.textContent = "km/h";
        weatherIcon.src = "./img/Clear.png";
        
        throw new Error(message);
    }
    else{
        var data = await response.json();

        cityField.textContent= data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°c`;
        humidity.textContent = `${data.main.humidity} %`;
        windSpeed.textContent = `${data.wind.speed.toFixed(1)} km/h`;
        weatherIcon.src = `./img/${data.weather[0].main}.png`;
    }   
}


searchBtn.addEventListener("click", () =>{
    checkWeather(searchBox.value);
})
