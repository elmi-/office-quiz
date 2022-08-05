import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./game.css";

function Game() {
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
    setLosses(losses + 1)
    alert("wrong, try again!")
  }

  return ( 
      <div id="game" class="flex-center flex-column">
      <div id="game-header">
      <div id="game-header-item">
        <p class="game-header-prefix">
          Question
        </p>
        <h1 class="game-header-main-text" id="question-counter">
        
        </h1>
      </div>
      <div id="game-header-item">
        <p class="game-header-prefix">
          Score
        </p>
        <h1 class="game-header-main-text" id="score">
          0
        </h1>
      </div>
    </div>
    <p>Wins: { wins } | Loses: { losses }</p>
    <h2 id="question">{!quote ? "Loading..." : quote.content}</h2>
    <div class="choice-container" onClick={() => validateAnser("good")}>
      <p class="choice-prefix">A</p>
      <p class="choice-text" data-number="1">{!quote ? "Start" : quote.character.firstname + " " + quote.character.lastname}</p>
    </div>
    <div class="choice-container" onClick={() => validateAnser("bad")}>
      <p class="choice-prefix">B</p>
      <p class="choice-text" data-number="2">{!characters ? "Start" : characters.firstname + " " + characters.lastname}</p>
    </div>
  </div>
  );
}

export default Game;