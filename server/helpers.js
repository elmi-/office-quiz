const axios  = require("axios");

async function getQuote() {
  try {
    const res = await axios.get("https://officeapi.dev/api/quotes/random")
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function getCharecters() {
  try {
    const res = await axios.get("https://officeapi.dev/api/characters/random")
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { getQuote, getCharecters }