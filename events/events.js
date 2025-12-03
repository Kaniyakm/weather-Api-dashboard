const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("city-input");
const errorMsg = document.getElementById("error-message");
const spinner = document.getElementById("loading");

function showError(message) {
  //declares functions
  errorMsg.textContent = message; //targerting the text content of DOM elemnt
  errorMsg.classList.remove("hidden"); // remove hidden class; displays error
  spinner.classList.add("hidden"); // ^ vice verse
}

searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  spinner.classList.remove("hidden");
  fetchWeather(city);
});
