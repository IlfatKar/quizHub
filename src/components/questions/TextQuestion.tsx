import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {IAnswer, IQuestion} from "../../types";

const TextQuestion: FC<{ question: IQuestion, onAnswer?: (title: string, bool: boolean) => void }> =
  ({question, onAnswer}) => {
    const [text, setText] = useState('')
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value)
    }
    useEffect(() => {
      if (onAnswer) {
        if (text.trim() === question.correct) {
          onAnswer(question.title, true)
        } else {
          onAnswer(question.title, false)
        }
      }
    }, [text])
    return (
      <div className={'testQuestion question'}>
        <label>
          <p>{question.title}</p>
          <input type="text" value={text} onChange={onChangeHandler} placeholder={'Your answer'}/>
        </label>
      </div>
    );
  };

export default TextQuestion;