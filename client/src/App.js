import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);
  const [characters, setCharacters] = useState(null);

  const getData = function() {
    axios.get("/api/quote")
    .then(res => {
      console.log("get data")
      setQuote(res.data.quote)
    });

    axios.get("api/characters")
    .then(res => {
      setCharacters(res.data.randomCharacter)
    })
  };  

  useEffect(() => {
    getData();
  }, []);

  const validateAnser = function(value) {
    if(value === "good") {
      alert("correct!");
      getData();
      return;
    }
    alert("wrong, try again!")
  }

  return (
    <div className="App" style={{background: 'url(https://picsum.photos/700/?blur=3)'}}>
      <header className="App-header">
        <p>{!quote ? "Loading..." : quote.content}</p> 
        <p>{!quote ? "" : quote.character.firstname} {!quote ? "" : quote.character.lastname}</p>
      </header>
      <button type="button" onClick={() => validateAnser("good")}>{!quote ? "Start" : quote.character.firstname + " " + quote.character.lastname}</button>
      <button type="button" onClick={() => validateAnser("bad")}>{!characters ? "Start" : characters.firstname + " " + characters.lastname}</button>
    </div>
  );
}

export default App;