// server/index.js
const express = require("express");
const { getQuote, getCharecters } = require("./helpers");
const cors = require("cors");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get("/api/quote", (req, res) => {
  const quotePromise = getQuote();
  quotePromise.then(response => {
    res.json({ quote: response.data.data })
  })
});

app.get("/api/characters", (req, res) => {
  const charPromise = getCharecters();
  charPromise.then(response => {
    res.json({ randomCharacter: response.data.data })
    // console.log(response.data.data)
  })
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});