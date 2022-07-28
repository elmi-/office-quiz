// server/index.js
const express = require("express");
const { getQuote } = require("./helpers");
const cors = require("cors")

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get("/api/quote", (req, res) => {
  const quotePromise = getQuote();
  quotePromise.then(response => {
    res.json({ quote: response.data.data })
  })
  console.log(getQuote())
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});