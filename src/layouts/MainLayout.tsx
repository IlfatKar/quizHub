import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Home from "../components/Home/Home";
import CreateQuiz from "../components/CreateQuiz/CreateQuiz";
import OpenQuiz from "../components/OpenQuiz";
import QuizPage from "../components/Quiz/QuizPage";

const MainLayout = () => {
  return (
    <div className={'mainLayout'}>
      <h1 className={'logo logo-title'}><Link to={'/'}>Quiz<span className={'logo-second'}>Hub</span></Link></h1>
      <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/createQuiz'}>Create New Quiz</Link>
        <Link to={'/openQuiz'}>Open Quiz</Link>
      </nav>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/createQuiz'} element={<CreateQuiz/>}/>
        <Route path={'/openQuiz'} element={<OpenQuiz/>}/>
        <Route path={'/quiz/:id'} element={<QuizPage/>}/>
      </Routes>
    </div>
  );
};

export default MainLayout;