import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./game.css";

function Game() {
  const [quote, setQuote] = useState(null);
  const [charactersA, setCharactersA] = useState(null);
  const [charactersB, setCharactersB] = useState(null);
  const [charactersC, setCharactersC] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const getData = function() {
    axios.get("/api/quiz")
    .then(res => {
      console.log(res.data.characterA)
      setQuote(res.data.quote.data)
      setCharactersA(res.data.characterA.data)
      setCharactersB(res.data.characterB.data)
      setCharactersC(res.data.characterC.data)
    });
  };  

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const renderShuffledOptions = function() {
    let choices = [
      { val: quote.character.firstname + " " + quote.character.lastname, result: "good" },
      { val: charactersA.firstname + " " + charactersA.lastname, result: "bad" },
      { val: charactersB.firstname + " " + charactersB.lastname, result: "bad" },
      { val: charactersC.firstname + " " + charactersC.lastname,  result: "bad"}
    ]

    const randomOptions = shuffle(choices);
    const alphaArr = ["A", "B", "C", "D"]
    let alphaArrIndex = 0;
    return (
      <div>
        { randomOptions.map(option => {
          
          return (
            <div class="choice-container" onClick={() => validateAnser(option.result)}>
            <p class="choice-prefix">{ alphaArr[alphaArrIndex] }</p>
            <p class="choice-text" data-result={ option.result }>{ option.val }</p>
            <div class="hidden">{ alphaArrIndex++ }</div>
          </div>
          
          )
        })}
      </div>
    );
  }

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
      { renderShuffledOptions() }
  </div>
  );
}

export default Game;