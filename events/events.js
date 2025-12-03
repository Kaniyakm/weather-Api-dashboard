const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("city-input");
const errorMsg = document.getElementById("error-message");
const spinner = document.getElementById("loading");

spinner.style.display = "none";

function showError(message) {
  //declares functions
  errorMsg.textContent = message; //targerting the text content of DOM elemnt
  errorMsg.style.display = "block"; // display error directly
  spinner.style.display = "none"; // hide spinner
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
    errorMsg.style.display = "none";
  }
});

function displayWeather(data, city) {
  const container = document.getElementById("weather-container");

  container.innerHTML = `
    <article class="weather-card">
      <h3 class="weather-city">${city}</h3>

      <p class="weather-temp">
        <strong>Temperature:</strong> ${data.temperature} °C
      </p>

      <p class="weather-condition">
        <strong>Condition:</strong> ${data.condition}
      </p>

      <p class="weather-extra">
        <strong>Humidity:</strong> ${data.humidity}%
      </p>
    </article>
  `;

  spinner.style.display = "none";
}
