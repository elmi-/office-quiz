import React, { useCallback } from "react";
import "./score.css"

const Score = function({ wins, losses, onScoreChange }) {
const handleScoreChange = useCallback((val) => {
  onScoreChange(val)
}, [onScoreChange]);

return (
  <div id="game-header" onChange={ handleScoreChange }>
    <div id="game-header-item" class="score">
      <p class="game-header-prefix">
        Wins
      </p>
      <h1 class="game-header-main-text" id="score" >
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
)
}

export default Score;