import React, {FC, useState} from 'react';
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/all";
import {IQuiz} from "../types";
import {Link} from 'react-router-dom'
import {useAppDispatch} from "../store/hooks";
import {doRatingDown, doRatingUp} from "../store/features/quizzes/quizzesSlice";

interface QuizCardProps {
  quiz: IQuiz
}

const QuizCard: FC<QuizCardProps> = ({quiz}) => {
  const dispatch = useAppDispatch()
  const [rating, setRating] = useState(quiz.rating)
  const [clicked, setClicked] = useState(false)
  const ratingUp = () => {
    dispatch(doRatingUp({id: quiz.id, quiz}))
    setRating(rating ? rating + 1 : 1)
    setClicked(true)
  }
  const ratingDown = () => {
    dispatch(doRatingDown({id: quiz.id, quiz}))
    setRating(rating ? rating - 1 : -1)
    setClicked(true)
  }
  return (
    <div className={'quizCard'}>
      <h2>{quiz.title}</h2>
      <p>{quiz.description || ''}</p>
      <div>
        <p>Rating: <AiFillCaretUp onClick={() => !clicked && ratingUp()}/> {rating || 0} <AiFillCaretDown
          onClick={() => !clicked && ratingDown()}/></p>
        <Link to={'/quiz/' + quiz.id}>
          <button>Start</button>
        </Link>
      </div>
    </div>
  );
};

export default QuizCard;