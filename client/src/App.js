import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/quote")
    .then((res) => res.json())
    .then((data) => {
      setData(data.quote.content)
    });
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;