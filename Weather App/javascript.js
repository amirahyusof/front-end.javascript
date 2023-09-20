//Changing background when user click search button
    const searchButton = document.getElementById('search-btn');
    const body = document.body;

    const images = [
        'images01.jpg',
        'images02.jpg',
        'images03.jpg',
        'images04.jpg',
        'images05.jpg',
        'images06.jpg',
        'images07.jpg',
        'images08.jpg', 
        'howl011.jpg'
    ];

    function changeBackgroundImages(){
        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = `url(${images[randomIndex]})`;
        body.style.backgroundImage = imageUrl;
    }

    // Add a click event listener to the search button
    if (searchButton) {
        searchButton.addEventListener('click', changeBackgroundImages);
    }



//Display the weather, temperature, wind and humidity by user search button
const apiKey = "cdffda32effcee5d9fc7901fad79c2f2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".city-search input");
const searchBtn = document.querySelector(".search-btn");
const errorDisplay = document.querySelector(".error");
const weatherDisplay = document.querySelector(".display-weather");
const currentForecastContainer = document.querySelector(".current-forecast");
const sixDayForecastContainer = document.querySelector(".six-day-forecast");


async function getWeather(city) {

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
      errorDisplay.style.display = "block";
      weatherDisplay.style.display = "none";
  
      }else {
        errorDisplay.style.display = "none";
        weatherDisplay.style.display = "block"; 
        
        const data = await response.json();

        const currentForecast = document.createElement("div");
        currentForecast.classList.add("display-weather");

        const weatherMain = data.weather[0].main;
        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        currentForecast.innerHTML = `
            <div class="icon">
            <img src="${weatherIcon}" alt="weather-icon">
            <h4 class="icon-name">${weatherMain}</h4>
            </div>
            <div class="weather">
            <h4 class="temp">Temp: ${Math.round(data.main.temp)}°C</h4>
            <h4 class="wind">Wind: ${data.wind.speed} km/h</h4>
            <h4 class="humidity">Humidity: ${data.main.humidity}%</h4>
            </div>
        `;
        
        currentForecastContainer.innerHTML = '';
        currentForecastContainer.appendChild(currentForecast);
        }

  } catch (error) {
    console.log("Error fetching weather", error);
    errorDisplay.style.display = "block";
    weatherDisplay.style.display = "none";
  }
}


//Display 6-day forecast
// Modify this part to fetch and display the 6-day forecast

async function getSixDayForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        const forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const forecastContainer = document.querySelector(".six-day-forecast");

        // Clear previous forecast data
        forecastContainer.innerHTML = '';

        let currentDay = -1;
        const daysToShow = 6; // Show forecast for the next 6 days

        for (const forecast of data.list) {
            const forecastDate = new Date(forecast.dt * 1000);
            const forecastDay = forecastDate.getDay();

            if (forecastDay !== currentDay) {
                currentDay = forecastDay;

                const forecastElement = document.createElement("div");
                forecastElement.classList.add("forecast-day");

                forecastElement.innerHTML = `
                    <p class="day">${forecastDays[forecastDay]}</p>
                    <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="weather-icon" class="forecast-icon">
                    <p class="forecast-description">${forecast.weather[0].description}</p>
                    <p class="forecast-temp">${Math.round(forecast.main.temp)}°C</p>
                `;

                forecastContainer.appendChild(forecastElement);

                // Stop after showing forecast for the specified number of days
                if (forecastContainer.childElementCount >= daysToShow) {
                    break;
                }
            }
        }
    } catch (error) {
        console.log("Error fetching forecast", error);
    }
}



// Update the current time and day for the specified location
const inputBox = document.getElementById("search-input");
const dayTimeDisplay = document.getElementById("current-day-time");
const locationNameDisplay = document.getElementById("location-name");

const apiKeyTime = "Z05RHWLYB0D2";
const apiUrlTime = "https://api.timezonedb.com/v2.1/get-time-zone";


async function updateDayTimeForLocation(location) {
    try {
        const response = await fetch(`${apiUrlTime}?key=${apiKeyTime}&format=json&by=position&lat=${location.lat}&lng=${location.lon}`);
        const data = await response.json();

        if (data.status === "OK") {
            const localTime = new Date(data.formatted);
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const currentDay = days[localTime.getUTCDay()];
            const currentTime = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            dayTimeDisplay.textContent = `${currentDay} ${currentTime}`;
        } else {
            dayTimeDisplay.textContent = "Time not available";
        }
    } catch (error) {
        console.log("Error fetching time", error);
        dayTimeDisplay.textContent = "Time not available";
    }
}

// Update the location name
function updateLocationName(location) {
    locationNameDisplay.textContent = location;
}

// Call the functions when search button is clicked
searchBtn.addEventListener("click", async () => {
    const city = inputBox.value;
    const location = await getCoordinatesForCity(city);
    if (location) {
        updateLocationName(city);
        updateDayTimeForLocation(location);
        getWeather(city);
    }
});

// Function to fetch location coordinates using the OpenWeatherMap API
async function getCoordinatesForCity(city) {
    const geocodingApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(geocodingApiUrl);
        const data = await response.json();

        if (data.coord) {
            return data.coord;
        } else {
            console.log("Location not found");
            return null;
        }
    } catch (error) {
        console.log("Error fetching coordinates", error);
        return null;
    }
}


//Call the function when search button is clicked
searchBtn.addEventListener("click", async() => {
  const city = searchBox.value;
  updateLocationName(city);
  updateDayTimeForLocation(city);
  getWeather(city);
  getSixDayForecast(city);
});
