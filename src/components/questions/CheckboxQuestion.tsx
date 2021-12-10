import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {IAnswer, IQuestion} from "../../types";

const CheckboxQuestion: FC<{ question: IQuestion, onAnswer?: (title: string, bool: boolean) => void }> =
  ({question, onAnswer}) => {
    const [ans, setAns] = useState<number[]>([])
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let tmp = [...ans]
      if (tmp.includes(+e.target.value)) {
        tmp = tmp.filter(i => i !== +e.target.value)
        setAns([...tmp])
      } else {
        setAns([...tmp, +e.target.value])
      }

    }
    useEffect(() => {
      if ((question.correct as number[]).length === ans.length) {
        let tmp: boolean = true;
        (question.correct as number[]).forEach((item: number) => {
          if (!ans.includes(item)) tmp = false
        })
        onAnswer?.(question.title, tmp)
      } else {
        onAnswer?.(question.title, false)
      }
    }, [ans])
    return (
      <div className={'checkboxQuestion question'}>
        <p>{question.title}</p>
        {question.answers.map((item: IAnswer) => (
          <label key={question.title + item.i}>
            <input type="checkbox" value={item.i} onChange={onChangeHandler}/>
            <p>{item.value}</p>
          </label>
        ))}
      </div>
    );
  };

export default CheckboxQuestion;