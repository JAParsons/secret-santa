import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import Particles from 'react-particles-js';
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
  const [paramData, setParamData] = useState(null);

  useEffect(() => {
    try {
      const decryptedQueryParam = decryptData(getQueryParam());
      setParamData(JSON.parse(decryptedQueryParam));
    } catch (error) {}
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

  const generate = () => {
    const shuffledPeople = [...people];
    const copiedPeople = [...people];

    // The Sattolo cycle is an algorithm for randomly
    // shuffling an array in such a way that each
    // element ends up in a new position.
    for (let i = shuffledPeople.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = shuffledPeople[i];
      shuffledPeople[i] = shuffledPeople[j];
      shuffledPeople[j] = temp;
    }

    copiedPeople.map((person, index) => {
      person.toGift = shuffledPeople[index].name;
    });

    console.log(copiedPeople);
    setPeople(copiedPeople);
    setGenerated(true);
  };

  return (
    <div className="app">
      <Particles
        params={{
          particles: {
            number: {
              value: 300,
              density: {
                enable: false
              }
            },
            size: {
              value: 6,
              random: true
            },
            move: {
              speed: 2,
              direction: 'bottom',
              out_mode: 'out'
            },
            line_linked: {
              enable: false
            }
          }
        }}
      />
      <Santa />
      {!paramData ? (
        <>
          <Typography variant="h4">Secret Santa Generator</Typography>
          <GenerateButton variant="contained" onClick={() => generate()}>
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
              <IconButton color="secondary" type="submit">
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
                    encryptData={encryptData}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <Typography variant="h5">
            Hello {paramData?.name}! <br></br> You're getting a gift for{' '}
            <strong>{paramData?.toGift}</strong>.
          </Typography>
          <Typography variant="h5"></Typography>
        </>
      )}
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

const getQueryParam = () =>
  window.location.search.substr(1).replace('data=', '');

const encryptData = (data, key = process.env.REACT_APP_ENCRYPT_KEY) =>
  CryptoJS.AES.encrypt(data, key);

const decryptData = (encData, key = process.env.REACT_APP_ENCRYPT_KEY) =>
  CryptoJS.AES.decrypt(encData, key).toString(CryptoJS.enc.Utf8);

export default App;
