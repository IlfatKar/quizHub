import React from 'react';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/all";

const QuizCard = () => {
  return (
    <div className={'quizCard'}>
      <h2>title</h2>
      <p>desc</p>
      <div>
        <p>Rating: <AiFillCaretUp/> +1 <AiFillCaretDown/></p>
        <button>Start</button>
      </div>
    </div>
  );
};

export default QuizCard;