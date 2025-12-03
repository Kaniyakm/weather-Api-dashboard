const searchBtn = document.getElementById("");
const searchInput = document.getElementById("");
const errorMsg = document.getElementById("");
const spinner = document.getElementById("");

searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  spinner.classList.remove("hidden");

  fetchWeather(city);
});
