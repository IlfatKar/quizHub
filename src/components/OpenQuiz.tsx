import React, {useState} from 'react';
import {Link} from "react-router-dom";

const OpenQuiz = () => {
  const [quizId, setQuizId] = useState('')
  return (
    <div className={'openQuiz'}>
      <h1>Open Quiz</h1>
      <div className={'form'}>
        <label htmlFor="quizId">
          <p>Enter Quiz ID</p>
          <input type="text" id={'quizId'} value={quizId} placeholder={'Xa143fs2'}
                 onChange={e => setQuizId(e.target.value)}/>
        </label>
        <Link to={'/quiz/' + quizId}>
          <button>Search</button>
        </Link>
      </div>
    </div>
  );
};

export default OpenQuiz;