import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import defaultDataset from "./db.js";
import { Chats, AnswersList } from "./components/index";
import FormDialog from './components/forms/FormDialog.jsx';


const App = () => {
   const
      [data, setDate] = useState(defaultDataset),
      [initId, setInitId] = useState("init"),
      [answer, setAnswer] = useState([]),   //切り替える
      [chats, setChats] = useState([]),  // 履歴を残すので、前のデータはそのまま残す
      [open, setOpen] = useState(false);
   //QuestionのChat,answerのデータセット 
   const displayChange = (nextId) => {
      const nextQuestion = data[nextId].question;
      const chatData = {
         type: "question",
         content: nextQuestion,
      }
      const initAnswers = data[nextId].answers;
      setAnswer(initAnswers);
      setChats(prevState => [...prevState, chatData]);
   };
   //nextIdによる振り分け
   const switchChats = (nextId) => {
      switch (true) {
         case (nextId === "init"):
            displayChange(nextId);
            break;
         case (nextId === "contact"):
            setOpen(true)
            break;
         case (/^https:*/.test(nextId)):
            const a = document.createElement("a");
            a.href = nextId;
            a.target = `_blank`;
            a.click();
            break;

         default:
            displayChange(nextId);
            setInitId(nextId)
            break;
      }
   };

   const handleClick = useCallback((content, nextId) => {
      const chatData = {
         type: "answer",
         content: content,
      }
      setChats(prevState => [...prevState, chatData]);
      setTimeout(() => {
         switchChats(nextId)
      }, 1000)
   }, [setChats])


   useEffect(() => {
      switchChats(initId);
   }, []);

   useEffect(() => {
      const scrollArea = document.getElementById("scroll-area");
      if (scrollArea) {
         scrollArea.scrollTop = scrollArea.scrollHeight;
      }
   }, [chats]);

   return (
      <section className="c-section">
         <div className="c-box">
            <Chats chats={chats} />
            <AnswersList answers={answer} handleClick={handleClick} />
            <FormDialog open={open} setOpen={setOpen} />
         </div>
      </section>
   )
};

export default App;