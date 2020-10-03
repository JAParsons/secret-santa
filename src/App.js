import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div>
        <img src={"https://via.placeholder.com/150"} />
        <h1>Secret Santa Generator</h1>
      </div>
      <button onClick={() => console.log("Button clicked")}>
        Generate Secret Santa
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted");
        }}
      >
        <input type="text" placeholder="Enter a name..." />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
