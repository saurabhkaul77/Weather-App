const apiKey = "12ce47dbb5d9decc3b38c58ac16de1a2";
        const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");
    
        async function checkWeather(city) {
            if (city.trim() === "") {
                console.error("City name is empty. Please enter a valid city.");
                return;
            }
    
            const response = await fetch(`${apiURL}${city}&appid=${apiKey}`);
            const data = await response.json();
    
            if (response.ok) {
                console.log(data);
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".Humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".Wind").innerHTML = data.wind.speed + " km/h";
    
                // Update the weather icon based on the weather condition
                if (data.weather[0].main === 'Clouds') {
                    weatherIcon.src = '/images/clouds.png';
                } else if (data.weather[0].main === 'Clear') {
                    weatherIcon.src = '/images/clear.png';
                } else if (data.weather[0].main === 'Rain') {
                    weatherIcon.src = '/images/rain.png';
                } else if (data.weather[0].main === 'Drizzle') {
                    weatherIcon.src = '/images/drizzle.png';
                } else if (data.weather[0].main === 'Mist') {
                    weatherIcon.src = '/images/mist.png';
                }
            } else {
                console.error(data.message);
                document.querySelector(".city").innerHTML = "City not found";
                document.querySelector(".temp").innerHTML = "-- °C";
                document.querySelector(".Humidity").innerHTML = "--%";
                document.querySelector(".Wind").innerHTML = "-- km/h";
                weatherIcon.src = ''; // Clear the weather icon
            }
            document.querySelector(".weather").style.display = "block";

        }

    
        // Attatch event listener to the button
        searchBtn.addEventListener('click', () => {
            const city = searchBox.value;
            checkWeather(city);
        });