import React, { useState } from 'react';
import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { green } from '@material-ui/core/colors';
import Santa from './components/santa/santa';
import './App.css';

const GenerateButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    },
    borderRadius: 10,
    padding: 64,
    paddingTop: 16,
    paddingBottom: 16
  }
}))(Button);

const App = () => {
  const [people, setPeople] = useState([]);
  const [personName, setPersonName] = useState('');

  const addPerson = (person) => {
    setPeople([...people, person]);
  };

  const removePerson = (personIndex) => {
    const updatedPeople = [...people].filter(
      (_person, index) => index !== personIndex
    );
    console.log({ updatedPeople });
    setPeople(updatedPeople);
  };

  return (
    <div className="app">
      <Santa />
      <Typography variant="h4">Secret Santa Generator</Typography>
      <GenerateButton
        variant="contained"
        onClick={() => console.log('Button clicked')}
      >
        Generate Secret Santa
      </GenerateButton>
      <div className="person-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPerson({ name: personName });
            setPersonName('');
          }}
        >
          <TextField
            type="text"
            placeholder="Enter a name..."
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
          />
          <IconButton color="primary" type="submit">
            <AddIcon />
          </IconButton>
        </form>
      </div>
      {people.length > 0 ? (
        <div className="people-list">
          {people.map((person, index) => (
            <div key={index}>
              <p>{person.name}</p>
              <IconButton
                variant="contained"
                color="primary"
                onClick={() => removePerson(index)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default App;
