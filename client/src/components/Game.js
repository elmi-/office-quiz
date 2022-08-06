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

  const choices = Array.from(document.getElementsByClassName("choice-text"));

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
    return (
      <div>
        <div class="choice-container" onClick={() => validateAnser(randomOptions[0].result)}>
          {/* <p class="choice-prefix">A</p> */}
          <p class="choice-text" data-number="1">{ randomOptions[0].val }</p>
        </div>
        <div class="choice-container" onClick={() => validateAnser(randomOptions[1].result)}>
          {/* <p class="choice-prefix">B</p> */}
          <p class="choice-text" data-number="1">{ randomOptions[1].val }</p>
        </div>
        <div class="choice-container" onClick={() => validateAnser(randomOptions[2].result)}>
          {/* <p class="choice-prefix">C</p> */}
          <p class="choice-text" data-number="1">{ randomOptions[2].val }</p>
        </div>
        <div class="choice-container" onClick={() => validateAnser(randomOptions[3].result)}>
          {/* <p class="choice-prefix">D</p> */}
          <p class="choice-text" data-number="1">{ randomOptions[3].val }</p>
        </div>
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
      {/* below: for testing answers */}
      <p>{ quote.character.firstname + quote.character.lastname }</p>
      { renderShuffledOptions() }
      {/* <div class="choice-container" onClick={() => validateAnser("good")}>
        <p class="choice-prefix">A</p>
        <p class="choice-text" data-number="1">{!quote ? "Start" : quote.character.firstname + " " + quote.character.lastname}</p>
      </div>
      <div class="choice-container" onClick={() => validateAnser("bad")}>
        <p class="choice-prefix">B</p>
        <p class="choice-text" data-number="2">{!charactersA ? "Start" : charactersA.firstname + " " + charactersA.lastname}</p>
      </div> */}
  </div>
  );
}

export default Game;