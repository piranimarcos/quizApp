import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { deleteQuestion, getQuestion } from "../../actions/question";

const QuestionList = (props) => {
  const [question, setQuestion] = useState([]);
  const [isData, setIsData] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    if (props.data && props.data.total > 0) {
      setQuestion(props.data.questions);
      setIsData(true);
    } else {
      setIsData(false);
    }
  });

  const questionDelete = (id) => {
    console.log(id);
    dispatch(deleteQuestion(id, props.listId));
  };

  return (
    <div className="row">
      <div className="col-sm-12">
        <Link to={`/play/${props.listId}`} className="btn btn-success btn-block">
          Jugar
        </Link>
      </div>
      {isData ? (
        question.map((q, index) => (
          <div className="col-sm-6" key={index}>
          
            <div className="card">
              <div className="card-body " style={{ margin: "10px" }} role="alert">
                <h2>¿{q.title}?</h2>
                <br />
                { q.awnsers.length > 0 ? (
                  <>
                    <button className="btn btn-success text-center" type="button" data-toggle="collapse" data-target={`#collapseExample${q._id}`} aria-expanded="false" aria-controls={`collapseExample${q._id}`}>
                      ver respuestas
                    </button>
                  </>
                ) : "" }
                <button className="btn btn-danger text-center float-right" onClick={() => { questionDelete(q._id); }} >
                  Eliminar
                </button>

                <button className="btn btn-warning text-center" onClick={() => {props.updateQuestion(true, q)}}>Editar</button>
              </div>

              <div className="collapse" id={`collapseExample${q._id}`}>
                <div className="card-body">
                  <h4>Respuestas</h4>
                  {q.awnsers.map((awn, index) => {
                    return (
                      <div key={index+ 'a'}
                        className={`alert text-center ${
                          awn.isCorrect ? "alert-success" : "alert-danger"
                        }`}
                        role="alert"
                      >
                        {awn.awnser}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-danger text-center" role="alert">
          No hay datos
        </div>
      )}
    </div>
  );
};

export default QuestionList;
