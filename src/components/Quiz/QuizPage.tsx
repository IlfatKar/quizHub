import React, {FC, useEffect, useState} from 'react';
import {answerType, asyncStage, IAnswer, IQuestion} from "../../types";
import TextQuestion from "../questions/TextQuestion";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchQuizById} from "../../store/features/quizzes/quizzesSlice";

const QuizPage: FC = () => {
  const {id} = useParams()
  const {status, quiz} = useAppSelector(store => store.quizzes)
  const [quizEnd, setQuizEnd] = useState(false)
  const [answers, setAnswers] = useState({})
  const dispatch = useAppDispatch()
  const [correctCount, setCorrectCount] = useState(0)

  const checkCorrect = () => {
    setQuizEnd(true)
    setCorrectCount(0)
    let tmp = 0
    Object.values(answers).forEach(bool => {
      if (bool) {
        tmp++
      }
    })
    setCorrectCount(tmp)
  }

  const pushAnswer = (title: string, bool: boolean) => {
    setAnswers(
      {...answers, [title]: bool}
    )
  }

  useEffect(() => {
    dispatch(fetchQuizById(id as string))
  }, [])

  if (status === asyncStage.pending) {
    return <h1>Loading</h1>
  }

  if (status === asyncStage.fulfilled && quiz) {
    return (
      <div className={'quizPage'}>
        <h1>{quiz.title}</h1>
        <p>{quiz.description}</p>
        <div className={'questions'}>
          {
            quiz.questions.map((item: IQuestion, i) => (
              <div key={i}>
                {item.type === answerType.text ? <TextQuestion question={item} onAnswer={pushAnswer}/> :
                  item.type === answerType.radio ? <RadioQuestion question={item} onAnswer={pushAnswer}/> :
                    <CheckboxQuestion question={item} onAnswer={pushAnswer}/>}
              </div>
            ))
          }
        </div>
        <button disabled={quizEnd} onClick={checkCorrect}>End quiz</button>
        {quizEnd && <p>Your result: {correctCount} from {quiz.questions.length}</p>}
      </div>
    );
  } else {
    return <h1>Some Error</h1>
  }
};

export default QuizPage;