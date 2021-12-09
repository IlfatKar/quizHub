import React, {FC, useEffect, useState} from 'react';
import {answerType, asyncStage, IQuestion, IQuiz} from "../../types";
import TextQuestion from "../questions/TextQuestion";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchQuizById} from "../../store/features/quizzes/quizzesSlice";

const QuizPage: FC = () => {
    const {id} = useParams()
    const {status, quiz} = useAppSelector(store => store.quizzes)
    const dispatch = useAppDispatch()

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
    } else {
      return <h1>Some Error</h1>
    }
  }
;

export default QuizPage;