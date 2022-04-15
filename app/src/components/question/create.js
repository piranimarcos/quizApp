import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import {
  getQuestion,
  createQuestion,
  updateQuestion,
} from "../../actions/question";

const BasicForm = (props) => {
  const JsSchema = Yup.object().shape({
    title: Yup.string().required("Campo requerido"),
    cantInputs: Yup.string().required("Campo requerido"),
    inputCorrect: Yup.string().required("Campo requerido"),
    awnsers: Yup.array().of(
      Yup.object().shape({
        awnser: Yup.string().required("Campo requerido"),
        isCorrect: Yup.boolean().required("Campo requerido"),
      })
    ),
  });
  const optionsDf = { resolver: yupResolver(JsSchema) };
  const {
    control,
    formState,
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
  } = useForm(optionsDf);
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "awnsers",
    control,
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const dispatch = useDispatch();

  const cantInputs = watch("cantInputs");

  useEffect(() => {
    const currentProp = parseInt(cantInputs || 0);
    const previousProp = fields.length;
    if (currentProp > previousProp) {
      for (let i = previousProp; i < currentProp; i++) {
        append({ isCorrect: false });
      }
    } else {
      for (let i = previousProp; i > currentProp; i--) {
        remove(i - 1);
      }
    }
  }, [cantInputs]);

  useEffect(() => {
    if (props.isUpdateQuestion || props.questionUpdate) {
      setValue("_id", props.questionUpdate._id);
      setValue("title", props.questionUpdate.title);
      setValue("cantInputs", props.questionUpdate.awnsers?.length || 0);
      setValue("awnsers", props.questionUpdate.awnsers);
      setIsUpdate(props.isUpdateQuestion);
    }
  }, [props.isUpdateQuestion, props.questionUpdate]);

  const onSubmit = (res) => {
    const { cantInputs, inputCorrect, ...data } = res;
    data.awnsers.forEach((awnser) => {
      awnser.isCorrect = false;
    });
    data.awnsers[inputCorrect].isCorrect = true;
    data.listId = props.listId;
    console.log(JSON.stringify(data, null, 4));
    if (!isUpdate) {
      dispatch(createQuestion(data))
        .then(() => {
          reset();
          dispatch(getQuestion(props.listId));
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      dispatch(updateQuestion(data)).then(() => {
        reset();
        dispatch(getQuestion(props.listId));
        props.updateQuestion(false, { title: "", cantInputs: "", awnsers: [] });
      });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Nueva pregunta</h2>
          <div className="form-group">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">¿</span>
              </div>
              <input
                name="title"
                {...register("title")}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                type="text"
              />
              <div className="input-group-append">
                <span className="input-group-text">?</span>
              </div>
              <div className="invalid-feedback">{errors.title?.message}</div>
            </div>
          </div>
          <div className="form-group">
            <label>Cuantas respuestas vas a colocar?</label>
            <select
              name="cantInputs"
              {...register("cantInputs")}
              className={`form-control ${
                errors.cantInputs ? "is-invalid" : ""
              }`}
            >
              {["Elige una opción", 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.cantInputs?.message}</div>
          </div>
          {fields.map((item, i) => (
            <div key={i}>
              <div>
                <strong className="text-primary">respuesta {i + 1}</strong>
                <div className="form-group">
                  <input
                    name={`awnsers[${i}]awnser`}
                    {...register(`awnsers.${i}.awnser`)}
                    className={`form-control ${
                      errors.awnsers?.[i]?.awnser ? "is-invalid" : ""
                    }`}
                    type="text"
                  />
                  <div className="invalid-feedback">
                    {errors.awnsers?.[i]?.awnser?.message}
                  </div>
                </div>

                <div className="form-check">
                  <label htmlFor={`isCorrect${i}`}>
                    <input
                      {...register("inputCorrect")}
                      type="radio"
                      name="inputCorrect"
                      value={i}
                      className="form-check-input"
                      id={`isCorrect${i}`}
                    />
                    Correcta
                  </label>
                </div>
              </div>
            </div>
          ))}

          {errors.inputCorrect ? (
            <div className="alert alert-danger">
              Elija una respuesta correcta
            </div>
          ) : (
            ""
          )}
          {!isUpdate && (
            <>
              <button type="submit" className="btn btn-success">
                Crear
              </button>
              <button
                onClick={() => reset()}
                type="button"
                className="btn btn-info"
              >
                Reset
              </button>
            </>
          )}

          {isUpdate && (
            <div className="form-group">
              <button className="btn btn-info" type="submit">
                <span>Actualizar</span>
              </button>

              <button
                className="btn btn-danger"
                onClick={() => {
                  props.updateQuestion(false, {});
                }}
              >
                <span>Cancelar</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default BasicForm;
