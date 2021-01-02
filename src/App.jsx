import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Chats, AnswersList } from "./components/index";
import FormDialog from './components/forms/FormDialog.jsx';
import { db } from './firebase/index.js';

const App = () => {
   const
      [data, setData] = useState(),
      [initId, setInitId] = useState("init"),
      [answer, setAnswer] = useState([]),   //切り替える
      [chats, setChats] = useState([]),  // 履歴を残すので、前のデータはそのまま残す
      [open, setOpen] = useState(false);
   //QuestionのChat,answerのデータセット 
   const displayChange = (data) => {
      const nextQuestion = data.question;
      const initAnswers = data.answers;
      const chatData = {
         type: "question",
         content: nextQuestion,
      }
      setAnswer(initAnswers);
      setChats(prevState => [...prevState, chatData]);
   };
   //nextIdによる振り分け
   const switchChats = (nextId) => {
      switch (true) {
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
            setInitId(nextId)
            const nextData = data[nextId];
            displayChange(nextData);
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
   }, [setChats]);
   //レンダー時に初期値dataはundefinedになるので、最初のdataとしてprev{}をinitialDataとする。
   useEffect(() => {
      (async () => {
         if (!data) {
            const prev = {};
            await db.collection("questions").get().then((snapshots) => {
               snapshots.forEach(doc => {
                  const id = doc.id;
                  const DBdata = doc.data();
                  prev[id] = DBdata;
               });
               setData(prev)
            }).then(() => {
               const initData = prev[initId]
               displayChange(initData);
            })
         }
      })();
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