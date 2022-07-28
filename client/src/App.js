import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

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
      setWins(wins+ 1)
      getData();
      return;
    }
    if(losses !== 0 || wins !== 0) {
      setLosses(losses + 1)
      setWins(wins - 1)
    }
    alert("wrong, try again!")
  }

  return (
    <div className="App" style={{background: 'url(https://picsum.photos/700/?blur=3)'}}>
      <header className="App-header">
        <p>Wins: { wins } | Losses: { losses }</p>
        <p>{!quote ? "Loading..." : quote.content}</p> 
      </header>
      <button type="button" onClick={() => validateAnser("good")}>{!quote ? "Start" : quote.character.firstname + " " + quote.character.lastname}</button>
      <button type="button" onClick={() => validateAnser("bad")}>{!characters ? "Start" : characters.firstname + " " + characters.lastname}</button>
    </div>
  );
}

export default App;