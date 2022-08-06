import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./game.css";

function Game() {
  const [quote, setQuote] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const choices = Array.from(document.getElementsByClassName("choice-text"));

  const getData = function() {
    axios.get("/api/quiz")
    .then(res => {
      console.log(res.data.characterA)
      setQuote(res.data.quote.data)
      // TODO: set answer component to randomize selections and answer
      setCharacters(res.data.characterA.data)
    });
  };  

  useEffect(() => {
    getData();
  }, []);

  const validateAnser = function(value) {
    if(value === "good") {
      setWins(wins+ 1)
      getData();
      return;
    }
    setLosses(losses + 1)
    getData();
  }

  return ( 
      <div id="game" class="flex-center flex-column">
        <div id="game-header">
          <div id="game-header-item" class="score">
            <p class="game-header-prefix">
              Wins
            </p>
            <h1 class="game-header-main-text" id="score">
              { wins }
            </h1>
            <p class="game-header-prefix">
              Losses
            </p>
            <h1 class="game-header-main-text" id="score">
              { losses }
            </h1>
          </div>
      </div>
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