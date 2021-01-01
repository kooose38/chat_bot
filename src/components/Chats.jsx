import React from 'react';
import { Chat } from "./";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles({
   chats: {
      height: 400,
      padding: 0,
      overflow: "auto",
   }
});

const Chats = ({ chats }) => {
   const classes = useStyles();
   return (
      <List id="scroll-area" className={classes.chats}>
         {
            chats.length > 0 && (
               chats.map((chat, i) => (
                  <Chat key={i.toString()} chat={chat} />
               )
               ))
         }
      </List>
   )
};

export default Chats;