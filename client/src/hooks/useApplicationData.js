import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData () {
  const [quote, setQuote] = useState(null);
  const [charactersA, setCharactersA] = useState(null);
  const [charactersB, setCharactersB] = useState(null);
  const [charactersC, setCharactersC] = useState(null);

  const getData = () => {
    axios.get("/api/quiz")
    .then(res => {
      setQuote(res.data.quote.data)
      setCharactersA(res.data.characterA.data)
      setCharactersB(res.data.characterB.data)
      setCharactersC(res.data.characterC.data)
    });
  };  

  useEffect(() => {
    getData();
  }, []);

  return (
    getData,
    quote,
    charactersA,
    charactersB,
    charactersC
  )
}