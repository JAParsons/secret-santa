import React, { useState } from 'react';
import { Button, IconButton, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { orange } from '@material-ui/core/colors';
import './person.css';

const Person = ({ person, index, generated, removePerson }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copy link');

  const copyLinkHandler = () => {
    setCopyButtonText('Copied');
    setTimeout(() => {
      setCopyButtonText('Copy link');
    }, 1000);
  };

  return (
    <>
      <Typography>{person.name}</Typography>
      {generated ? (
        <div className="person-button-wrapper">
          <CopyButton onClick={() => copyLinkHandler()}>
            {copyButtonText}
          </CopyButton>
        </div>
      ) : (
        <div className="person-buton-wrapper">
          <IconButton
            variant="contained"
            color="primary"
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
