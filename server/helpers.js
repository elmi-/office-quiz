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

function getQuiz() {
  let endpoints = [
    'https://officeapi.dev/api/quotes/random',
    'https://officeapi.dev/api/characters/random',
    'https://officeapi.dev/api/characters/random',
    'https://officeapi.dev/api/characters/random',
  ];
  
  return axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
}

module.exports = { getQuote, getCharecters, getQuiz }