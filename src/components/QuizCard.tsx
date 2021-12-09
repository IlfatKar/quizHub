import React, {FC} from 'react';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/all";
import {IQuiz} from "../types";

interface QuizCardProps {
  quiz: IQuiz
}

const QuizCard: FC<QuizCardProps> = ({quiz}) => {
  return (
    <div className={'quizCard'}>
      <h2>{quiz.title}</h2>
      <p>{quiz.description || ''}</p>
      <div>
        <p>Rating: <AiFillCaretUp/> {quiz.rating || 0} <AiFillCaretDown/></p>
        <button>Start</button>
      </div>
    </div>
  );
};

export default QuizCard;