// Open-meteo API call 

async function fetchWeather(city) { 
try {
let geoUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json&limit=1`;

let geoRes = await fetch(geoUrl);
let geoData = await geoRes.json();
if (!geoData[0]) {
throw new Error("City not found");
}
let lat = geoData[0].lat;
let lon = geoData[0].lon;

let weatherUrl = `https://api.open-meteo.com/v1/gfs?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weather_code`;

let weatherRes = await fetch(weatherUrl);
let weatherData = await weatherRes.json();

if (weatherData.error) {
throw new Error(weatherData.reason);
}
return {
temperature: weatherData.hourly.temperature_2m[0],
humidity: weatherData.hourly.relative_humidity_2m[0],
condition: weatherData.hourly.weather_code[0]};
} catch (error) {
    throw new Error(error.message);
  } }

