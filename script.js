const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const suggestionsContainer = document.querySelector('.suggestions');

const weatherImages = {
    Clouds: "assets/cloud.png",
    Clear: "assets/clear.png",
    Rain: "assets/rain.png",
    Mist: "assets/mist.png",
    Haze: "assets/haze.png", 
    Snow: "assets/snow.png"
};

let recentSearches = ["Hyderabad", "Delhi", "London"]; // Initial suggestion cities

function updateSuggestions() {
    // Clear existing suggestions
    suggestionsContainer.innerHTML = '';
    console.log("Made by Ashwin")

    // Add recent successful searches as suggestions
    recentSearches.forEach(city => {
        const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1); // Capitalize the first letter of the city
        const cityBox = document.createElement('div');
        cityBox.classList.add('city-box');
        cityBox.textContent = capitalizedCity;
        cityBox.addEventListener('click', () => searchCity(city));
        suggestionsContainer.appendChild(cityBox);
    });
}

async function checkWeather(city) {
    const api_key = "7df996ad07816246891ed654d896e3b9"; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();
        console.log("Made by Ashwin")

        if (response.ok) {
            location_not_found.style.display = "none";
            weather_body.style.display = "flex";

            temperature.innerHTML = `${(weather_data.main.temp - 273.15).toFixed(1)}°C`;
            description.innerHTML = `${weather_data.weather[0].description}`;
            humidity.innerHTML = `${weather_data.main.humidity}%`;
            wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

            const weatherCondition = weather_data.weather[0].main;

            // Set weather background based on condition
            document.body.style.backgroundImage = `url('assets/${weatherCondition.toLowerCase()}-bg.jpg')`;

            // Set weather icon
            weather_img.src = weatherImages[weatherCondition] || ''; // Default to empty string if no image found
            
            // Add the searched city to recent searches if it's not already in the list
            if (!recentSearches.includes(city)) {
                // Add city to the beginning of the array
                recentSearches.unshift(city);
                
                // Limit recent searches to 3
                if (recentSearches.length > 3) {
                    // Remove the last suggestion from DOM
                    suggestionsContainer.removeChild(suggestionsContainer.lastChild);
                    
                    // Remove the last item from the array
                    recentSearches.pop();
                }
            }
            
            updateSuggestions(); // Update suggestions with recent searches
        } else {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // Display a generic error message to the user
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
    }
}
console.log("Made by Ashwin")


searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

// Update suggestions when the page loads
window.addEventListener('DOMContentLoaded', () => {
    updateSuggestions();
});
