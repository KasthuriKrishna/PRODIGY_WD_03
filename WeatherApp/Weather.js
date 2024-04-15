import React, { useState } from 'react';
import './Weather.css';
import thunder from './Thunder.mp4';
import logo from './logo.png';
import sunnyIcon from './sunny.png';
import cloudyIcon from './cloudy.png';
import rainyIcon from './rainy.png';
import snowyIcon from './snowy.png';
import defaultImage from './default-image.gif'; // Import default image

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationEntered, setLocationEntered] = useState(false); // Track if location is entered

  const API_KEY = '8be36104c59275ef5fc2a908ad42d1b3';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}${location}`);
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
      setLocationEntered(true); // Update locationEntered state
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const renderWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return <img src={sunnyIcon} alt="Sunny" className="weather-icon" />;
      case 'Clouds':
        return <img src={cloudyIcon} alt="Cloudy" className="weather-icon" />;
      case 'Rain':
        return <img src={rainyIcon} alt="Rainy" className="weather-icon" />;
      case 'Snow':
        return <img src={snowyIcon} alt="Snowy" className="weather-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="app-name">Weather App</h1>
      </div>
      <div className="content">
        <h2>Enter Location</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={location}
            onChange={handleChange}
            placeholder="Enter location"
          />
          <button type="submit">Get Weather</button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {weatherData && (
          <div className="weather-data">
            <h2>Current Weather in {weatherData.name}</h2>
            <div className="weather-details">
              {renderWeatherIcon(weatherData.weather[0].main)}
              <p>{weatherData.weather[0].description}</p>
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        )}
        {!locationEntered && <img src={defaultImage} alt="Default" className="default-image" />} {/* Render default image if location is not entered */}
      </div>
      <div className="background-video">
        <video autoPlay loop muted className="video-background">
          <source src={thunder} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default App;
