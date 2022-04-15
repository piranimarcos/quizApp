import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom'

import { getQuestion } from "../../actions/question";
import BasicForm from "./create";
import QuestionList from "./list";

const QuestionComponent = () => {

  const { id } = useParams();

  const { question } = useSelector((state) => state.question);
  const { message } = useSelector((state) => state.message);


  const [isUpdateQuestion, setIsUpdateQuestion] = useState(false)
  const [questionUpdate, setQuestionUpdate] = useState({});

  const updateQuestion = (uq, question) => {
    setIsUpdateQuestion(uq)
    setQuestionUpdate(question)
  }

  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getQuestion(id));
  }, []);

  return (
    <>

      <header className="jumbotron">
        {message && message.messageOk && ( <div className="alert alert-success" role="alert"> {message.messageOk} </div> )}
        {message && message.message && ( <div className="alert alert-danger" role="alert"> {message} </div> )}
        <BasicForm listId={id} isUpdateQuestion={isUpdateQuestion} questionUpdate={questionUpdate} updateQuestion={updateQuestion}/>
      </header>

      <QuestionList data={question} listId={id} updateQuestion={updateQuestion}/>
    </>
  );
};

export default QuestionComponent;