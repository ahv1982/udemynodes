const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p_location = document.querySelector("#location");
const p_temperature = document.querySelector("#temperature");
const p_humidity = document.querySelector("#humidity");
const p_visibility = document.querySelector("#visibility");
const p_cloudcover = document.querySelector("#cloudcover");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  p_location.textContent = "loading...";
  p_temperature.textContent = "";
  p_humidity.textContent = "";
  p_visibility.textContent = "";
  p_cloudcover.textContent = "";

  const location = search.value;
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p_location.textContent = data.error;
      } else {
        p_location.textContent = data.location;
        p_temperature.textContent = "Temperature: " + data.forecast.temperature;
        p_humidity.textContent = "humidity: " + data.forecast.humidity;
        p_visibility.textContent = "visibility: " + data.forecast.visibility;
        p_cloudcover.textContent = "cloudcover: " + data.forecast.cloudcover;
      }
    });
  });
});
