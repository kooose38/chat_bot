import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import React, { Component } from 'react'
import NoImage from "../assets/img/no-profile.png";

const Chat = ({ chat }) => {
   const classes = (chat.type === "question" ? "p-chat__row " : "p-chat__reverse")
   const images = (chat.type === "question" ? "/static/images/avatar/1.jpg" : NoImage);
   return (
      <ListItem className={classes}>
         <ListItemAvatar>
            <Avatar alt="chat-bot" src={images} />
         </ListItemAvatar>
         <div className="p-chat__bubble">
            {chat.content}
         </div>
      </ListItem>

   )
};

export default Chat;