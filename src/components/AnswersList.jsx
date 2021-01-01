import React, { Component } from 'react'
import Answer from './Answer';


const AnswersList = ({ answers, handleClick }) => {
   return (
      <div className="c-grid__answer">
         {answers.length > 0 && (
            answers.map(answer => (
               <Answer
                  key={answer.nextId}
                  content={answer.content}
                  nextId={answer.nextId}
                  handleClick={handleClick}

               />
            ))
         )}
      </div>
   );
}

export default AnswersList;