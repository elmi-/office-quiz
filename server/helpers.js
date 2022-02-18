const axios  = require("axios");

const getQuote = axios.get("https://officeapi.dev/api/quotes/random")
  .then(response => {
    // console.log(response.data.data)
    console.log("helper hit")
    return response.data.data;
  })
  .catch(error => {
    console.log(error);
  });  

module.exports = { getQuote }