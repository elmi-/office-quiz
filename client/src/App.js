import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
      axios.get("/api/quote")
      .then(res => {
        // console.log("initial load")
        setQuote(res.data.quote)
      })
    .catch(error => console.log(error)) 
  }, []);

  const getData = function() {
    axios.get("/api/quote")
    .then(res => {
      console.log("get data")
      setQuote(res.data.quote)
    })
  };  

  return (
    <div className="App" style={{background: 'url(https://picsum.photos/700/?blur=3)'}}>
      <header className="App-header">
        <p>{!quote ? "Loading..." : quote.content}</p> 
        <p>{!quote ? "" : quote.character.firstname} {!quote ? "" : quote.character.lastname}</p>
      </header>
      <button type="button" onClick={getData}>{!quote ? "Start" : quote.character.firstname}</button>
    </div>
  );
}

export default App;