// server/index.js
const express = require("express");
const { getQuote, getCharecters, getQuiz } = require("./helpers");
const cors = require("cors");
const { default: axios } = require("axios");
const { response } = require("express");

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
  })
});

app.get("/api/quiz", (req, res) => {
  const quizPromise = getQuiz();
  quizPromise.then(
    axios.spread(({data: quote}, {data: characterA}, {data: characterB}, {data: characterC}) => {
      res.json({ quote, characterA, characterB, characterC })
    })
  )
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});