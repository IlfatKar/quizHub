import React, {FC} from 'react';
import {IQuestion} from "../../types";

const TextQuestion: FC<{ question: IQuestion }> = ({question}) => {
  return (
    <div className={'testQuestion question'}>
      <label>
        <p>{question.title}</p>
        <input type="text" placeholder={'Your answer'}/>
      </label>
    </div>
  );
};

export default TextQuestion;