import React, {FC} from 'react';
import QuizCard from "../QuizCard";
import {IQuiz} from "../../types";

interface QuizListProps {
  quizzes: IQuiz[]
}

const QuizList: FC<QuizListProps> = ({quizzes}) => {
  return (
    <div className={'quizList'}>
      {
        quizzes.map((item, i) => (
          <QuizCard key={item.title + i} quiz={item}/>
        ))
      }
    </div>
  );
};

export default QuizList;