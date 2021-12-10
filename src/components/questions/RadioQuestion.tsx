import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {IAnswer, IQuestion} from "../../types";

const RadioQuestion: FC<{ question: IQuestion, onAnswer?: (title: string, bool: boolean) => void }> =
  ({question, onAnswer}) => {
    const [val, setVal] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setVal(e.target.value)
    }
    useEffect(() => {
      if (onAnswer) {
        if (val.trim() === question.correct) {
          onAnswer(question.title, true)
        } else {
          onAnswer(question.title, false)
        }
      }
    }, [val])
    return (
      <div className={'radioQuestion question'}>
        <p>{question.title}</p>
        {question.answers.map((item: IAnswer) => (
          <label key={question.title + item.i}>
            <input type="radio" value={item.i} onChange={onChangeHandler} name={question.title}/>
            <p>{item.value}</p>
          </label>
        ))
        }
      </div>
    );
  };

export default RadioQuestion;