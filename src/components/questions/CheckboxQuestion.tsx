import React, {FC} from 'react';
import {IAnswer, IQuestion} from "../../types";

const CheckboxQuestion: FC<{ question: IQuestion }> = ({question}) => {
  return (
    <div className={'checkboxQuestion question'}>
      <p>{question.title}</p>
      {question.answers.map((item: IAnswer) => (
        <label key={question.title + item.i}>
          <input type="checkbox"/>
          <p>{item.value}</p>
        </label>
      ))}
    </div>
  );
};

export default CheckboxQuestion;