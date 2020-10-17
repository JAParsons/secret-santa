import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { orange } from '@material-ui/core/colors';
import './person.css';

const Person = ({ person, index, generated, removePerson, encryptData }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy link');

  const copyLinkHandler = () => {
    setCopyButtonText('Copied');
    setTimeout(() => {
      setCopyButtonText('Copy link');
    }, 1000);
  };

  const generateLink = () => {
    const data = JSON.stringify({ name: person.name, toGift: person.toGift });
    const encryptedData = encryptData(data);
    return window.location.origin.toString() + '/?data=' + encryptedData;
  };

  return (
    <>
      <Typography>{person.name}</Typography>
      {generated ? (
        <div className="person-button-wrapper">
          <CopyToClipboard text={generateLink()}>
            <CopyButton onClick={() => copyLinkHandler()}>
              {copyButtonText}
            </CopyButton>
          </CopyToClipboard>
        </div>
      ) : (
        <div className="person-button-wrapper">
          <IconButton
            variant="contained"
            color="secondary"
            onClick={() => removePerson(index)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

const CopyButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(orange[700]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700]
    },
    borderRadius: 10,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8
  }
}))(Button);

export default Person;
