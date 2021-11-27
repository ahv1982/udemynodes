const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p_location = document.querySelector("#location");
const p_forecast = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  p_location.textContent = "loading...";
  p_forecast.textContent = "";

  const location = search.value;
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        p_location.textContent = data.error;
      } else {
        p_location.textContent = data.location;
        p_forecast.textContent = data.forecast.temperature;
      }
    });
  });
});
