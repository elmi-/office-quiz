// server/index.js
const express = require("express");
const axios  = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/quote", (req, res) => {
  axios.get("https://officeapi.dev/api/quotes/random")
  .then(response => {
    res.json({ quote: response.data })
  })
  .catch(error => {
    console.log(error);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});