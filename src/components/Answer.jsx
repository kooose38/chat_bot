import * as React from 'react';
import { Component } from 'react';
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
   button: {
      backgroundColor: "#333",
      color: "#fff",
      fontWeight: 600,
      transition: "0.4",
      "&:hover": {
         backgroundColor: "#eee",
         color: "#000"
      }
   }
})

const Answer = ({ content, nextId, handleClick }) => {
   const classes = useStyles();
   return (
      <Button
         className={classes.button}
         variant="outlined"
         onClick={() => handleClick(content, nextId)}
      >
         {content}
      </Button>
   )
};

export default Answer