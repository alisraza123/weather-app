import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../Css/weather.css';

const WeatherApp = () => {
  
  const apikey = '9c80df11eb929d9a72e5d50bb1e69bb3';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
  const [inputCity, setInputCity] = useState('');
  const [weatherDetails, setWeatherDetails] = useState(undefined);
  const [weatherImage, setWeatherImage] = useState("");

  const getData = () => {
    if (inputCity === '') {
      return;
    }
    const Url = `${apiUrl}${inputCity}&appid=${apikey}`;
    console.log('Fetching data from URL:', Url);
    fetch(Url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === '404') {
          setWeatherDetails(null);
          setWeatherImage(null); // Reset image if no data found
        } else {
          setWeatherDetails(data);
          console.log(data)
          // Set image based on weather condition
          if (data.weather && data.weather.length > 0) {
            const weatherMain = data.weather[0].main;
            if (weatherMain === "Clouds") {
              setWeatherImage("clouds.png");
            } else if (weatherMain === "Clear") {
              setWeatherImage("sun.png");
            } else if (weatherMain === "Rain") {
              setWeatherImage("rain.png");
            } else if (weatherMain === "Drizzle") {
              setWeatherImage("drizzle.png");
            } else if (weatherMain === "Mist") {
              setWeatherImage("mist.png");
            } else if (weatherMain === "Haze") {
              setWeatherImage("haze.png");
            } 
           else if (weatherMain === "Smoke") {
            setWeatherImage("fog.png");
          }
            else {
              setWeatherImage(null);
            }
          } else {
            setWeatherImage(null);
          }
        }
      })
  
    // setInputCity('');
  };
  

  return (
    <div className='weatherBox'>
      <img src="66.png" alt="Weather" />
      <div className='insideBox'>
        <div className='upper'>
          <div>
            <FontAwesomeIcon icon={faLocationDot} className='location' />
            <h4>{inputCity==""? 'Unknown': weatherDetails ? weatherDetails.name : 'Unknown'}</h4>
          </div>
          <div><h4>{new Date().toLocaleDateString()}</h4></div>
        </div>
        <div className="middle">
          <input type="text" onChange={(event) => setInputCity(event.target.value)} value={inputCity} placeholder='Enter City Name...'/>
          <button onClick={getData}>Search</button>
        </div>
        <p style={{color:'black',textAlign:'center',width:'fit-content',fontSize:'1.2vw',marginBottom:'2vw'}}>
  {inputCity === "" ? 'Enter City Name Above' : (weatherDetails === null ? 'No weather data available' : '')}
</p>

        <div className="lower">
          {weatherDetails ? (
            <>
              <div className="left">
                <p>{Math.floor(weatherDetails.main.temp)}°C</p>
                <div className='miMaxTemp'>
                  <p style={{fontSize:'1vw'}}>Min: {weatherDetails.main.temp_min}</p>
                  <p style={{fontSize:'1vw'}}>Max: {weatherDetails.main.temp_max} </p>
                </div>
              </div>
              <div className="right">
                <img src={weatherImage} alt="Weather" />
                <h1>{weatherDetails.weather[0].main}</h1>
                <div className="info">
                  <div className='humidity'>
                    <img src="humidity.png" alt="Humidity" />
                    <p>{weatherDetails.main.humidity}%</p>
                  </div>
                  <div className='humidity'>
                    <img src="temp.png" alt="Temperature" />
                    <p>{weatherDetails.main.temp}°C</p>
                  </div>
                </div>
              </div>
            </>
          ) :''}
        </div>

      </div>
      <p className='create'>Created By Ar Dev's</p>
    </div>
  );
}

export default WeatherApp;
