document.addEventListener('DOMContentLoaded', function() {
    
    // Your OpenWeather API Key
    const API_KEY = '8b0aaa4d8f589fcaff1cd4118202aaf3'; // Replace with your actual API key
    
    // District data for each state
    const stateDistricts = {
        // ... (keep your existing stateDistricts object as is)
         punjab: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 
                'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 
                'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 
                'Sangrur', 'Shahid Bhagat Singh Nagar', 'Tarn Taran'],
        haryana: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 
                 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 
                 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 
                 'Yamunanagar'],
        up: ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 
            'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 
            'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 
            'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 
            'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 
            'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 
            'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 
            'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 
            'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 
            'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 
            'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
        uk: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 
            'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 
            'Uttarkashi'],
        hp: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 
            'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
        rajasthan: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 
                  'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 
                  'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 
                  'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 
                  'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur']
    
    };

    // DOM Elements
    const stateSelect = document.getElementById('state-select');
    const districtSelect = document.getElementById('district-select');
    const searchBtn = document.getElementById('search-weather');
    const locationElement = document.getElementById('location');
    const dateElement = document.getElementById('date');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDesc = document.getElementById('weather-desc');
    const currentTemp = document.getElementById('current-temp');
    const highTemp = document.getElementById('high-temp');
    const lowTemp = document.getElementById('low-temp');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const forecastContainer = document.getElementById('forecast-container');
    const currentConditions = document.getElementById('current-conditions');
    const recommendations = document.getElementById('recommendations');

    // Mapping of weather condition codes to icon classes
    const weatherIcons = {
        '01d': 'sun',           // clear sky (day)
        '01n': 'moon',          // clear sky (night)
        '02d': 'cloud-sun',     // few clouds (day)
        '02n': 'cloud-moon',    // few clouds (night)
        '03d': 'cloud',         // scattered clouds
        '03n': 'cloud',
        '04d': 'cloud',         // broken clouds
        '04n': 'cloud',
        '09d': 'cloud-rain',    // shower rain
        '09n': 'cloud-rain',
        '10d': 'cloud-sun-rain',// rain (day)
        '10n': 'cloud-moon-rain',// rain (night)
        '11d': 'bolt',          // thunderstorm
        '11n': 'bolt',
        '13d': 'snowflake',     // snow
        '13n': 'snowflake',
        '50d': 'smog',          // mist
        '50n': 'smog'
    };

    // Farming recommendations based on weather conditions
    const farmingRecommendations = {
        hot: [
            "Increase irrigation frequency to prevent water stress",
            "Irrigate in early morning or late evening to reduce evaporation",
            "Apply mulch to conserve soil moisture",
            "Consider shade nets for sensitive crops",
            "Monitor for heat stress symptoms in plants"
        ],
        rainy: [
            "Ensure proper drainage in fields to prevent waterlogging",
            "Postpone fertilizer application to avoid runoff",
            "Monitor for fungal diseases and apply preventive measures",
            "Harvest mature crops before heavy rains if possible",
            "Check for soil erosion and take preventive measures"
        ],
        normal: [
            "Continue regular irrigation schedule",
            "Monitor crops for pests and diseases",
            "Apply fertilizers as per crop growth stage",
            "Carry out weeding operations",
            "Prepare for upcoming seasonal changes"
        ],
        cold: [
            "Protect sensitive crops with row covers",
            "Delay irrigation on frost-prone mornings",
            "Apply organic mulch to protect roots from cold",
            "Consider windbreaks for exposed fields",
            "Monitor for cold damage symptoms"
        ]
    };

    // Populate districts when state is selected
    stateSelect.addEventListener('change', function() {
        const selectedState = this.value;
        districtSelect.innerHTML = '<option value="">Select District</option>';
        
        if (selectedState) {
            districtSelect.disabled = false;
            stateDistricts[selectedState].forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase().replace(/ /g, '-');
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        } else {
            districtSelect.disabled = true;
        }
    });

    // Search weather for selected location
    searchBtn.addEventListener('click', function() {
        const state = stateSelect.value;
        const district = districtSelect.value;
        
        if (!state || !district) {
            alert('Please select both state and district');
            return;
        }
        
        const locationName = districtSelect.options[districtSelect.selectedIndex].text;
        const stateName = stateSelect.options[stateSelect.selectedIndex].text;
        
        // Fetch weather data from OpenWeather API
        fetchWeatherData(locationName, stateName);
    });

    // Fetch weather data from OpenWeather API
    async function fetchWeatherData(locationName, stateName) {
        try {
            // First get coordinates for the location
            const geoResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${locationName},${stateName},IN&limit=1&appid=${API_KEY}`
            );
            
            if (!geoResponse.ok) {
                throw new Error('Failed to fetch location data');
            }
            
            const geoData = await geoResponse.json();
            
            if (geoData.length === 0) {
                throw new Error('Location not found');
            }
            
            const { lat, lon } = geoData[0];
            
            // Then get current weather and forecast
            const [currentResponse, forecastResponse] = await Promise.all([
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`),
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
            ]);
            
            if (!currentResponse.ok || !forecastResponse.ok) {
                throw new Error('Failed to fetch weather data');
            }
            
            const currentData = await currentResponse.json();
            const forecastData = await forecastResponse.json();
            
            // Process and display the data
            processWeatherData(currentData, forecastData, locationName, stateName);
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again later.');
        }
    }

    // Process weather data from API
    function processWeatherData(currentData, forecastData, locationName, stateName) {
        // Process current weather
        const currentWeather = {
            temp: Math.round(currentData.main.temp),
            high: Math.round(currentData.main.temp_max),
            low: Math.round(currentData.main.temp_min),
            humidity: currentData.main.humidity,
            wind: Math.round(currentData.wind.speed * 3.6), // Convert m/s to km/h
            condition: currentData.weather[0].main,
            icon: weatherIcons[currentData.weather[0].icon] || 'cloud'
        };
        
        // Process forecast data
        const dailyForecast = {};
        
        forecastData.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });
            
            if (!dailyForecast[day]) {
                dailyForecast[day] = {
                    high: Math.round(item.main.temp_max),
                    low: Math.round(item.main.temp_min),
                    icon: weatherIcons[item.weather[0].icon] || 'cloud',
                    condition: item.weather[0].main
                };
            } else {
                dailyForecast[day].high = Math.max(dailyForecast[day].high, Math.round(item.main.temp_max));
                dailyForecast[day].low = Math.min(dailyForecast[day].low, Math.round(item.main.temp_min));
            }
        });
        
        // Convert to array format for display
        const forecastArray = Object.keys(dailyForecast).slice(0, 7).map(day => {
            return {
                day: day,
                icon: dailyForecast[day].icon,
                high: dailyForecast[day].high,
                low: dailyForecast[day].low
            };
        });
        
        // Display the processed data
        displayCurrentWeather(currentWeather, locationName, stateName);
        displayForecast(forecastArray);
        displayRecommendations(currentWeather);
    }

    // Display current weather
    function displayCurrentWeather(data, location, state) {
        locationElement.textContent = `${location}, ${state}`;
        
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        weatherIcon.className = 'fas fa-' + data.icon;
        weatherDesc.textContent = data.condition;
        currentTemp.textContent = data.temp;
        highTemp.textContent = data.high + '°';
        lowTemp.textContent = data.low + '°';
        humidity.textContent = data.humidity + '%';
        wind.textContent = data.wind + ' km/h';
    }

    // Display 7-day forecast
    function displayForecast(forecastData) {
        forecastContainer.innerHTML = '';
        
        forecastData.forEach(day => {
            const forecastCard = document.createElement('div');
            forecastCard.className = 'forecast-card';
            
            forecastCard.innerHTML = `
                <p class="day">${day.day}</p>
                <i class="fas fa-${day.icon}"></i>
                <div class="temps">
                    <span class="high">${day.high}°</span>
                    <span class="low">${day.low}°</span>
                </div>
            `;
            
            forecastContainer.appendChild(forecastCard);
        });
    }

    // Display farming recommendations
    function displayRecommendations(weatherData) {
        let conditionType = 'normal';
        
        if (weatherData.temp > 35) {
            conditionType = 'hot';
        } else if (weatherData.icon.includes('rain')) {
            conditionType = 'rainy';
        } else if (weatherData.temp < 15) {
            conditionType = 'cold';
        }
        
        currentConditions.textContent = `Current weather conditions are ${weatherData.condition.toLowerCase()} with temperatures around ${weatherData.temp}°C.`;
        
        recommendations.innerHTML = '';
        farmingRecommendations[conditionType].forEach(rec => {
            const li = document.createElement('li');
            li.textContent = rec;
            recommendations.appendChild(li);
        });
    }

    // Initialize with current date
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
});