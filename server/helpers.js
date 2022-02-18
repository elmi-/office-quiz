const axios  = require("axios");

const getQuote = axios.get("https://officeapi.dev/api/quotes/random")
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error);
  });  


module.exports = { getQuote }