const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("city-input");
const errorMsg = document.getElementById("error-message");
const spinner = document.getElementById("loading");

spinner.style.display = "none";

function showError(message) {
  errorMsg.textContent = message;
  errorMsg.style.display = "block";
  spinner.style.display = "none";
}

searchBtn.addEventListener("click", async () => {
  const city = searchInput.value.trim();
  errorMsg.style.display = "none";

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  spinner.style.display = "block";

  try {
    const data = await fetchWeather(city);
    displayWeather(data, city);
  } catch (err) {
    showError(err.message);
  } finally {
    spinner.style.display = "none";
  }
});

function displayWeather(data, city) {
  const card = document.querySelector(".weather-card-custom");

  const cityEl = card.querySelector("h3");
  const infoEls = card.querySelectorAll("p");
  const iconEl = card.querySelector("img");

  cityEl.textContent = city;
  infoEls[0].textContent = `temp: ${data.temperature}°c`;
  infoEls[1].textContent = `condition: ${data.condition}`;
  infoEls[2].textContent = `humidity: ${data.humidity}%`;

  iconEl.src = "http://openweathermap.org/img/wn/01d@2x.png";
}
