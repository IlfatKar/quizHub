import React, {FC} from 'react';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/all";
import {IQuiz} from "../types";
import {Link} from 'react-router-dom'

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
        <Link to={'/quiz/' + quiz.id}>
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;