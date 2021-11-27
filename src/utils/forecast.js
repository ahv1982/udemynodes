const request = require("postman-request");

const forecast = (logitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=36866a50b120e6c694ef06610dfdb38f&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(logitude);

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to geocode services.", undefined);
    } else if (body.error) {
      callback("unable to find coordinate.", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        location: body.location.name,
      });
    }
  });
};

module.exports = forecast;
