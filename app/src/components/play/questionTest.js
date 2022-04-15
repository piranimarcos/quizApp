import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'

const QuestionTest = (props) => {
  const [countResponse, setCountResponse] = useState(0);
  const [countActual, setCountActual] = useState(0);
  const [countCorrect, setCountCorrect] = useState(0);

  const [list, setList] = useState("");
  const [isMsg, setIsMsg] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isResponse, setIsResponse] = useState(false);

  useEffect(() => {
    if (props.data) {
      let question = props.data.lists.find( l => l._id == props.id)
      console.log(question)
      setList(question)
    }
  },[ props.data]);

  const follow = () => {
    if (
      countResponse === countActual &&
      !(list.questions.length <= countActual)
    ) {
      setIsMsg(true);
    } else {
      setCountActual(countActual + 1);
      setIsResponse(false);
    }
  };

  const selectAwnser = (isCorrect) => {
    if (!isResponse) {
      setCountResponse(countResponse + 1);
      if (isCorrect) {
        setCountCorrect(countCorrect + 1);

        setIsCorrect(true);
        console.log("correcta");
      } else {
        setIsCorrect(false);
        console.log("incorrecta");
      }
    }
    setIsResponse(true);
  };

  return (
    <div className="card" style={{width: '70%'}}>
      <div className="card-body">
        {list && (
          <>
            <h5 className="card-title text-center">{list.title}</h5>
            <br />
            {list.questions.map((q, index) => {
              return (
                <div
                  className="alert alert-dark"
                  role="alert"
                  style={{ display: index === countActual ? "" : "none" }}
                >
                  <h5>¿{q.title}?</h5>

                  {q.awnsers.map((a) => {
                    return (
                      <div
                        className={`alert ${
                          isResponse
                            ? a.isCorrect
                              ? "alert-success"
                              : "alert-warning"
                            : "alert-warning"
                        } text-center`}
                        role="alert"
                        onClick={() => {
                          selectAwnser(a.isCorrect);
                        }}
                      >
                        {a.awnser}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            <div
              className="alert alert-dark"
              role="alert"
              style={{
                display: list.questions.length <= countActual ? "" : "none",
              }}
            >
              <h5>Felicidades, lo has Hecho. Tus resultados son:</h5>
              <p>Respuestas correctas: {countCorrect}</p>
              <p>Respuestas incorrectas: {countResponse - countCorrect}</p>
              <p>
                Procentaje de acierto: {(countCorrect / countResponse) * 100} %
              </p>

              
              <Link to={`/listquestion`} className="btn btn-info btn-block">
                  Volver
                </Link>
            </div>
          </>
        )}

        {isResponse && (
          isCorrect ? (
            <div className="alert alert-success text-center" role="alert">
              Excelente, bien hecho!
            </div>
          ) : (
            <div className="alert alert-danger text-center" role="alert">
              Lo siento, Mejor suerte para la próxima
            </div>
          )
        )}

        {isMsg && !isResponse && !(list.questions.length <= countActual) &&(
          <div className="alert alert-danger text-center" role="alert">
            Debe seleccionar una respuesta
          </div>
        )}

        <button className="btn btn-primary" onClick={follow} style={{
                display: list.questions?.length <= countActual ? "none" : "",
              }}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default QuestionTest;
