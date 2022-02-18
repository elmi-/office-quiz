// server/index.js
const express = require("express");
const { getQuote } = require("./helpers");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/quote", (req, res) => {
  getQuote.then(response => {
    res.json({ quote: response.data })
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});