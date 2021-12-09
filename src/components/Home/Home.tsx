import React, {FC, useEffect} from 'react';
import QuizList from "./QuizList";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchQuizzes} from "../../store/features/quizzes/quizzesSlice";
import {asyncStage} from "../../types";

const Home: FC = ({}) => {
  const {quizzes, status} = useAppSelector((state) => state.quizzes)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchQuizzes())
  }, [])
  return (
    <div className="screen homeScreen">
      {
        status === asyncStage.pending ? <h1>Loading</h1> :
          <div className={'home-grid'}>
            <div>
              <h2>New quizzes</h2>
              <QuizList quizzes={quizzes}/>
            </div>
            <div>
              <h2>Top quizzes</h2>
              <QuizList quizzes={quizzes}/>
            </div>
          </div>
      }
    </div>

  );
}

export default Home;
