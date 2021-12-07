import React, {FC} from 'react';
import {IAnswer, IQuestion} from "../../types";

const RadioQuestion: FC<{ question: IQuestion }> = ({question}) => {
  console.log(question)
  return (
    <div className={'radioQuestion question'}>
      <p>{question.title}</p>
      {question.answers.map((item: IAnswer) => (
        <label key={question.title + item.i}>
          <input type="radio" name={question.title}/>
          <p>{item.value}</p>
        </label>
      ))
      }
    </div>
  );
};

export default RadioQuestion;