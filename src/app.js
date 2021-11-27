const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;

const app = express();

//define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialDirectoryPath = path.join(__dirname, "../templates/partials");

//set up handle bars
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialDirectoryPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather app",
    name: "av",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "av",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    helpmessage: "av",
    name: "abhishek",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide a address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "help not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "page not found",
  });
});

console.log(publicDirectoryPath);

app.listen(port, () => console.log("Server is up on port " + port));
