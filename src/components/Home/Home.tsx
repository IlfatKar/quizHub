import React from 'react';
import QuizList from "./QuizList";

function Home() {
  return (
    <div className="screen homeScreen">
      <div className={'home-grid'}>
        <div>
          <h2>New quizzes</h2>
          <QuizList/>
        </div>
        <div>
          <h2>Top quizzes</h2>
          <QuizList/>
        </div>
      </div>
    </div>

  );
}

export default Home;
