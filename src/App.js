import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { Button, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import Santa from './components/santa/santa';
import Person from './components/person/person';
import './App.css';

const App = () => {
  const [people, setPeople] = useState([]);
  const [personName, setPersonName] = useState('');
  const [generated, setGenerated] = useState(false);
  const [paramData, setParamData] = useState({});

  useEffect(() => {
    // const decryptedQueryParam = decryptData('some key', getQueryParam('data'));
    // setParamData(decryptedQueryParam);
    console.log(
      encryptData(JSON.stringify({ name: 'John', person: 'Freya' }), 'sdfdsf')
    );
    console.log(
      JSON.parse(
        decryptData(
          encryptData(
            JSON.stringify({ name: 'John', person: 'Freya' }),
            'sdfdsf'
          ),
          'sdfdsf'
        )
      )
    );
  }, []);

  const addPerson = (person) => {
    setGenerated(false);
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
      <GenerateButton variant="contained" onClick={() => setGenerated(true)}>
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
          <input
            type="text"
            required
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
            <div key={index} className="person">
              <Person
                person={person}
                index={index}
                generated={generated}
                removePerson={removePerson}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

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

const getQueryParam = (key) =>
  new URLSearchParams(window.location.search).get(key);

const encryptData = (data, key) => {
  return CryptoJS.AES.encrypt(data, key);
};

const decryptData = (encData, key) => {
  return CryptoJS.AES.decrypt(encData, key).toString(CryptoJS.enc.Utf8);
};

export default App;
