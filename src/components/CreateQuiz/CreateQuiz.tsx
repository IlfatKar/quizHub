import React, {useEffect, useState} from 'react';
import CreateQuizModal from "./CreateQuizModal";
import {answerType, IQuestion, IQuiz} from "../../types";
import TextQuestion from "../questions/TextQuestion";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";
import {useAppDispatch} from "../../store/hooks";
import {addQuiz} from "../../store/features/quizzes/quizzesSlice";
import {store} from 'react-notifications-component';

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const addQuestion = (question: IQuestion) => {
    setQuestions([...questions, question])
  }

  const dispatch = useAppDispatch()

  const createQuiz = () => {
    let obj: IQuiz = {
      rating: 0,
      title,
      description,
      questions
    }
    try {
      dispatch(addQuiz(obj))
      store.addNotification({
        title: "Success",
        message: "Quiz created successful",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    //  TODO: REDIRECT TO QUIZ PAGE
    } catch (e: any) {
      store.addNotification({
        title: "Quiz save error!",
        message: e.message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }

  }

  return (
    <div className={'createQuiz'}>
      <h1>Create New Quiz</h1><br/>
      <input placeholder={'Your Title'} value={title} type="text" onChange={e => setTitle(e.target.value)}/> <br/><br/>
      <input type="text" placeholder={'Your Description'} value={description}
             onChange={e => setDescription(e.target.value)}/>
      {modalOpen && <CreateQuizModal addQuestion={addQuestion}
                                     closeModal={() => setModalOpen(false)}/>}
      <div className={'questions'}>
        {
          questions.map((item, i) => (
            <div key={i}>
              {item.type === answerType.text ? <TextQuestion question={item}/> :
                item.type === answerType.radio ? <RadioQuestion question={item}/> :
                  <CheckboxQuestion question={item}/>}
            </div>
          ))
        }
      </div>
      <button onClick={(e) => setModalOpen(true)}>Add Question</button>
      <button onClick={createQuiz}>Save Quiz</button>
    </div>
  );
};

export default CreateQuiz;