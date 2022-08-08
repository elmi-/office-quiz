import React from "react";
import { useState, useEffect } from "react";
import { shuffle } from "../helpers/helpers";
import axios from 'axios';
import "./game.css";
import Score from "./Score";

const Game = function() {
  const [quote, setQuote] = useState(null);
  const [charactersA, setCharactersA] = useState(null);
  const [charactersB, setCharactersB] = useState(null);
  const [charactersC, setCharactersC] = useState(null);
  const [score, setScore] = useState({
    wins: 0,
    losses: 0
  })

  const getData = function() {
    axios.get("/api/quiz")
    .then(res => {
      setQuote(res.data.quote.data)
      setCharactersA(res.data.characterA.data)
      setCharactersB(res.data.characterB.data)
      setCharactersC(res.data.characterC.data)
    });
  };  

  const renderShuffledOptions = function() {
    let choices = [];
    if(quote && charactersA && charactersB && charactersC) {
     choices = [
        { val: quote.character.firstname + " " + quote.character.lastname, result: "good" },
        { val: charactersA.firstname + " " + charactersA.lastname, result: "bad" },
        { val: charactersB.firstname + " " + charactersB.lastname, result: "bad" },
        { val: charactersC.firstname + " " + charactersC.lastname,  result: "bad"}
      ]
    }

    const randomOptions = shuffle(choices);
    
    const alphaArr = ["A", "B", "C", "D"]
    let alphaArrIndex = 0;

    return (
      <div class="choice-parent">
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

  const validateAnser = function(value, obj) {
    if(value === "good") {
      setScore({
        wins: score.wins+1,
        losses: score.losses
      })
      getData();
      return;
    }
    setScore({
      losses: score.losses+1,
      wins: score.wins
    })
    getData();
  }


  return ( 
    <div id="game" class="flex-center flex-column">
        <div id="game-header">
          <Score wins={score.wins} losses={score.losses} onScoreChange={ setScore } />
      </div>
    
      <h2 id="question">{!quote ? "loading" : quote.content}</h2>
      { renderShuffledOptions() }
  </div>
  );
}

export default Game;