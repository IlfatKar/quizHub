import React, {ChangeEvent, FC, useState} from 'react';
import {answerType, IQuestion} from "../../types";

interface ICreateQuizModalPropsType {
  closeModal: () => void,
  addQuestion: (question: IQuestion) => void,
}

const CreateQuizModal: FC<ICreateQuizModalPropsType> = ({closeModal, addQuestion}) => {
  const [type, setType] = useState<answerType>(answerType.text)
  const [answerCount, setAnswerCount] = useState<number>(1)
  const [title, setTitle] = useState<string>("")
  const [answers, setAnswers] = useState<any[]>([])
  const [correct, setCorrect] = useState<string | number>('')

  const chooseAnswerCount = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerCount((+e.target.value))
    setAnswers([])
  }

  const saveQuestion = () => {
    addQuestion({title, type, answers, correct})
    setAnswers([])
    closeModal()
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    if (answers[i]) {
      const answersCopy = [...answers]
      answersCopy[i].value = e.target.value
      setAnswers([...answersCopy])
    } else {
      setAnswers([...answers, {i, value: e.target.value}])
    }
  }

  const displayAnswerInput = () => {
    if (type === answerType.text) {
      return <div><input type="text" onChange={(e) => {
        setCorrect(e.target.value)
        setAnswers([e.target.value])
      }}
                         placeholder={'Your answer'}/></div>
    }
    if (type === answerType.radio) {
      return (<div className={'question'}>
          <label>
            Answer count: <input type="number" value={answerCount} min={1} onChange={chooseAnswerCount}/>
          </label>
          {[...Array(answerCount)].map((_, i) => (
            <label key={i}>
              <input type="radio" value={i} onChange={e => setCorrect(e.target.value)}
                     name={title || new Date().toDateString()}/>
              <input type={'text'} placeholder={'Answer'}
                     onChange={(e) => onChangeHandler(e, i)}/>
            </label>))}
        </div>
      )
    } else {
      return (<div className={'question'}>
          <label>
            Answer count: <input type="number" value={answerCount} min={1} onChange={chooseAnswerCount}/>
          </label>
          {[...Array(answerCount)].map((_, i) => (
            <label key={i}>
              <input type="checkbox" value={i} onChange={e => setCorrect(e.target.value)}/>
              <input type={'text'} placeholder={'Answer'}
                     onChange={(e) => onChangeHandler(e, i)}/>
            </label>))}
        </div>
      )
    }
  }

  return (
    <div className={'createQuizModal'}>
      <div className={'modal'}>
        <h2>Create Question</h2>
        <label>Enter question:<input placeholder={'Your question'} type="text"
                                     onChange={(e) => setTitle(e.target.value)}/></label>
        <label>Choose answer type:
          <select onChange={e => {
            setType(e.target.value as answerType)
            setAnswers([])
          }}>
            <option value={answerType.text}>Text</option>
            <option value={answerType.radio}>Radio button</option>
            <option value={answerType.checkbox}>Checkbox</option>
          </select>
        </label>
        {
          displayAnswerInput()
        }
        <button onClick={() => saveQuestion()}>Save</button>
        <button onClick={() => closeModal()}>Close</button>
      </div>
    </div>
  );
};

export default CreateQuizModal;