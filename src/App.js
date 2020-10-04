import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [people, setPeople] = useState([]);
  const [personName, setPersonName] = useState('');

  const addPerson = (person) => {
    setPeople([...people, person]);
  };

  return (
    <div className="App">
      <div>
        <img src={'https://via.placeholder.com/150'} />
        <h1>Secret Santa Generator</h1>
      </div>
      <button onClick={() => console.log('Button clicked')}>
        Generate Secret Santa
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPerson({ name: personName });
          setPersonName('');
        }}
      >
        <input
          type="text"
          placeholder="Enter a name..."
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <div>
        {people.map((person, index) => (
          <div>
            <p>{person.name}</p>
            <button onClick={() => console.log('Button clicked')}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
