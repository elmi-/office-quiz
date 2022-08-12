export const shuffle = function(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const fullNameFormatter = function(firstName = "", lastName = "") {
  debugger;
  if(lastName === "null")
  lastName = "";
  const fullName = `${firstName} ${lastName}`;
  return fullName;    
}

export const validateAnser = function(value, score, setScore) {
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