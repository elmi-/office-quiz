// server/index.js
const path = require("path");
const express = require("express");
const { getQuote, getCharecters, getQuiz } = require("./helpers");
const cors = require("cors");
const { default: axios } = require("axios");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors())

// Node serve the files for our built React app (/client)
app.use(express.static(path.resolve(__dirname, '../client/build')));

// GET requests to /api/quote route - DEPRICATED
app.get("/api/quote", (req, res) => {
  const quotePromise = getQuote();
  quotePromise.then(response => {
    res.json({ quote: response.data.data })
  })
});

// GET requests to /api/characters route - DEPRICATED
app.get("/api/characters", (req, res) => {
  const charPromise = getCharecters();
  charPromise.then(response => {
    res.json({ randomCharacter: response.data.data })
  })
});

// GET requests to /api/quiz route
app.get("/api/quiz", (req, res) => {
  const quizPromise = getQuiz();
  quizPromise.then(
    axios.spread(({data: quote}, {data: characterA}, {data: characterB}, {data: characterC}) => {
      res.json({ quote, characterA, characterB, characterC })
    })
  )
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});