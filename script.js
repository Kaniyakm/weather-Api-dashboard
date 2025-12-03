// Open-meteo API call being called with async function

async function fetchWeather(city) { 
try {
let geoUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;  //grabs city name and converts to lat/lon for weather API and returns as JSON text

let geoRes = await fetch(geoUrl);  //waits for lat/lon numbers
let geoData = await geoRes.json(); // converts into JS object
if (!geoData[0]) {
throw new Error("City not found"); //error handling for city existence 
}
let lat = geoData[0].lat; // pulls lat coordinate
let lon = geoData[0].lon; // pulls lon coordinate 

let weatherUrl = `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weather_code`;   // weather URL uses lat/lon collected before, builds request using 3 requested data points.

let weatherRes = await fetch(weatherUrl);  // open-meteo API is called using your request
let weatherData = await weatherRes.json();  //converts to JS object

if (weatherData.error) {
throw new Error(weatherData.reason);    // error handling for bad API requests
}
const getConditionName = (code) => {
  const conditions = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
    80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Heavy thunderstorm'
  };
  return conditions[code] || 'Unknown';
};

return {
  temperature: weatherData.hourly.temperature_2m[0],
  humidity: weatherData.hourly.relative_humidity_2m[0],
  condition: getConditionName(weatherData.hourly.weather_code[0])
};

return {
  temperature: weatherData.hourly.temperature_2m[0],
  humidity: weatherData.hourly.relative_humidity_2m[0],  
  condition: getConditionName(weatherData.hourly.weather_code[0])
};    // grabs current weather, index[0] = right now. 
} catch (error) {
    throw new Error(error.message);  // additional error handling for any other errors
  } }

