import React, {FC, useState} from 'react';
import {answerType, IQuestion, IQuiz} from "../../types";
import TextQuestion from "../questions/TextQuestion";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";

const QuizPage: FC = () => {
  const [quiz, setQuiz] = useState<IQuiz>({
    title: 'test',
    questions: [
      {
        type: answerType.text,
        title: 'test',
        correct: 'test',
        answers: []
      },
      {
        type: answerType.radio,
        title: 'test',
        correct: 2,
        answers: [
          {
            i: 0,
            value: 'Hey'
          },
          {
            i: 1,
            value: 'Yo'
          },
          {
            i: 2,
            value: 'Hay'
          },
        ]
      }
    ]
  })
  return (
    <div className={'quizPage'}>
      <h1>{quiz.title}</h1>
      <div className={'questions'}>
        {
          quiz.questions.map((item: IQuestion, i) => (
            <div key={i}>
              {item.type === answerType.text ? <TextQuestion question={item}/> :
                item.type === answerType.radio ? <RadioQuestion question={item}/> :
                  <CheckboxQuestion question={item}/>}
            </div>
          ))
        }
      </div>
      <button>End quiz</button>
    </div>
  );
};

export default QuizPage;