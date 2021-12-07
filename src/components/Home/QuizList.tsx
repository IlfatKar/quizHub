import React from 'react';
import QuizCard from "../QuizCard";

const QuizList = () => {
  return (
    <div className={'quizList'}>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
    </div>
  );
};

export default QuizList;