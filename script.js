function getWeather() {
    const apiKey = '9d3b6ec828ac61d19025be40fd78be2c';
    const cityInput = document.getElementById('city');
    const city = cityInput.value;
  
    if (!city) {
      alert('Por favor, escribe una ciudad');
      return;
    }
  
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
    // Obtener clima actual
    fetch(currentWeatherUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al buscar el tiempo actual');
        }
        return response.json();
      })
      .then(data => {
        displayWeather(data);
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error al buscar el tiempo actual. Por favor, inténtelo de nuevo');
      })
      .finally(() => {
        // Limpiar el input siempre al final
        cityInput.value = '';
      });
  
    // Obtener pronóstico
    fetch(forecastUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al buscar el pronóstico');
        }
        return response.json();
      })
      .then(data => {
        displayHourlyForecast(data.list);
      })
      .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error al buscar el pronóstico. Por favor, inténtelo de nuevo');
      })
      .finally(() => {
        // Limpiar el input siempre al final
        cityInput.value = '';
      });
  }
  
  
  function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
  
    weatherInfoDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';
  
    if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  
      const temperatureHTML = `<p>${temperature}°C</p>`;
      const weatherHtml = `
        <p>${cityName}</p>
        <p>${description}</p>`;
  
      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;
  
      showImage();
    }
  }
  
  function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8); // Pronóstico para 24 horas (cada 3 horas)
  
    let hourlyHTML = '';
    next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15);
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
  
      hourlyHTML += `
        <div class="hourly-item">
          <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>
        </div>`;
    });
  
    hourlyForecastDiv.innerHTML = hourlyHTML;
  }
  
  function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
  }
  