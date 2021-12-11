import React, {FC, useEffect, useState} from 'react';
import QuizList from "./QuizList";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchQuizzes} from "../../store/features/quizzes/quizzesSlice";
import {asyncStage, IQuiz} from "../../types";

const Home: FC = ({}) => {
  const {quizzes, status} = useAppSelector((state) => state.quizzes)
  const dispatch = useAppDispatch()
  const [top, setTop] = useState<IQuiz[]>([])
  const [nw, setNw] = useState<IQuiz[]>([])
  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [])
  useEffect(() => {
    if (quizzes.length) {
      setNw([])
      setTop([])
      let limit = quizzes.length <= 10 ? quizzes.length : 10
      let tmpnw = [], tmpTop = []
      let tmp = [...quizzes].reverse()
      for (let i = 0; i < limit; i++) {
        tmpnw.push(tmp[i])
      }
      tmp.sort((a, b) => {
        if ((a.rating || 0) < (b.rating || 0)) {
          return 1
        } else {
          return -1
        }
      })
      for (let i = 0; i < limit; i++) {
        tmpTop.push(tmp[i])
      }
      setNw(tmpnw)
      setTop(tmpTop)
    }
  }, [quizzes])
  return (
    <div className="screen homeScreen">
      {
        status === asyncStage.pending ? <h1>Loading</h1> :
          <div className={'home-grid'}>
            <div>
              <h2>New quizzes</h2>
              <QuizList quizzes={nw}/>
            </div>
            <div>
              <h2>Top quizzes</h2>
              <QuizList quizzes={top}/>
            </div>
          </div>
      }
    </div>

  );
}

export default Home;
