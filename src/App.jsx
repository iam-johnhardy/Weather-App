import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setdata] = useState({});
  const [location, setlocation] = useState("");

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      // Construct the URL INSIDE the function, using the current 'location' state
      const api_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&unit=imperial&appid=2df63522f31237b38827f04e2fa7611a`;

      axios
        .get(api_URL)
        .then((response) => {
          setdata(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          // Add error handling for better debugging
          console.error("Error fetching data:", error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("Error request:", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error message:", error.message);
          }
        });
      setlocation("");
    }
  };

  // ... rest of your component (e.g., JSX for input field)

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setlocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <p className="bold">{data.weather[0].main}</p>
            ) : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="buttom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}

              <p>Humidity</p>
            </div>
            <div className="wide">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}

              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
