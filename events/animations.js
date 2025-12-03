// animations.js
// Contains all weather animation effects (rain, storm, cloud, sun, wind)

function applyWeatherAnimation(card, iconElement, condition) {
  condition = condition.toLowerCase();

  card.classList.remove("rain-effect", "storm-effect", "wind-effect");
  iconElement.classList.remove("sun-effect", "cloud-effect");

  if (condition.includes("rain") || condition.includes("shower")) {
    card.classList.add("rain-effect");
  }

  if (condition.includes("thunder") || condition.includes("storm")) {
    card.classList.add("storm-effect");
  }

  if (condition.includes("clear") || condition.includes("sun")) {
    iconElement.classList.add("sun-effect");
  }

  if (condition.includes("cloud") || condition.includes("overcast")) {
    iconElement.classList.add("cloud-effect");
  }

  if (condition.includes("wind")) {
    card.classList.add("wind-effect");
  }
}

