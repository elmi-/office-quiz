import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    fetch("/quote")
    .then((res) => res.json())
    .then((data) => setQuote(data.quote.content))
    .catch(error => console.log(error)) 
  }, []);

  return (
    <div className="App" style={{background: 'url(https://picsum.photos/700/?blur=1)'}}>
      <header className="App-header">
        <p>{!quote ? "Loading..." : quote}</p>
      </header>
    </div>
  );
}

export default App;