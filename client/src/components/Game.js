import { React, useState, useEffect } from "react";
import { shuffle, fullNameFormatter } from "../helpers/helpers";
import axios from 'axios';
import Score from "./Score";
import "./game.css";

const Game = function() {
  const [quiz, setQuiz] = useState({
    quote: null,
    characterA: null,
    characterB: null,
    characterC: null
  })

  const [score, setScore] = useState({
    wins: 0,
    losses: 0
  })

  const getData = async function() {
    await axios.get("/api/quiz")
    .then(res => {
      setQuiz((prev) => ({
        ...prev,
        quote: res.data.quote.data,
        characterA: res.data.characterA.data,
        characterB: res.data.characterB.data,
        characterC: res.data.characterC.data
      }))
    });
  };  

  const renderShuffledOptions = function() {
    let choices = [];
    if(quiz.quote && quiz.characterA && quiz.characterB && quiz.characterC) {
     choices = [
        { val: fullNameFormatter(quiz.quote.character.firstname, quiz.quote.character.lastname), result: "good" },
        { val: fullNameFormatter(quiz.characterA.firstname, quiz.characterA.lastname), result: "bad" },
        { val: fullNameFormatter(quiz.characterB.firstname, quiz.characterB.lastname), result: "bad" },
        { val: fullNameFormatter(quiz.characterC.firstname, quiz.characterC.lastname),  result: "bad"}
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
  }, [score]);

  const validateAnser = function(value) {
    if(value === "good") {
      setScore({
        wins: score.wins+1,
        losses: score.losses
      })
      return;
    }
    setScore({
      losses: score.losses+1,
      wins: score.wins
    })
  }


  return ( 
    <div id="game" class="flex-center flex-column">  
      <Score wins={score.wins} losses={score.losses} onScoreChange={ setScore } />
      <h2 id="question">{ !quiz.quote ? "loading" : quiz.quote.content }</h2>
      { renderShuffledOptions() }
  </div>
  );
}

export default Game;