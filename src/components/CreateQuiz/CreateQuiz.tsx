import React, {useState} from 'react';
import CreateQuizModal from "./CreateQuizModal";
import {answerType, IQuestion} from "../../types";
import TextQuestion from "../questions/TextQuestion";
import RadioQuestion from "../questions/RadioQuestion";
import CheckboxQuestion from "../questions/CheckboxQuestion";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const addQuestion = (question: IQuestion) => {
    setQuestions([...questions, question])
  }

  return (
    <div className={'createQuiz'}>
      <h1>Create New Quiz</h1>
      {modalOpen && <CreateQuizModal addQuestion={addQuestion} closeModal={() => setModalOpen(false)}/>}
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
      <button>Save Quiz</button>
    </div>
  );
};

export default CreateQuiz;