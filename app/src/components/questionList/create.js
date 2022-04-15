import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { createList, getList, updateList } from "../../actions/list";
import { clearMessage } from "../../actions/message";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Este campo es requerido!
      </div>
    );
  }
};

const CreateList = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  
  const userId = JSON.parse(localStorage.getItem("user")).user.uid;

  const [list, setList] = useState({ title: "", userId });
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  
  const dispatch = useDispatch();

  const onChangeTitle = (e) => {
    list.title = e.target.value;
    setList(list);
  };

  useEffect(() => {
    console.log(props);
    if (props.listUpdate) {
      setList(props.listUpdate);
      setIsUpdate(props.isUpdateList);
    }
  });

  const handleCreate = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if(!isUpdate){
        dispatch(createList(list))
          .then(() => {
            dispatch(getList());
            setLoading(false);
            setIsUpdate(false)
          })
          .catch(() => {
            setLoading(false);
          });
      }else{
        console.log("editar")
        dispatch(updateList(list))
          .then(() => {
            dispatch(getList());
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleCreate} ref={form}>
          <div className="form-group">
            <label htmlFor="title">Cuestionario</label>
            <Input
              type="text"
              className="form-control"
              name="title"
              value={list.title}
              onChange={onChangeTitle}
              validations={[required]}
            />
          </div>

          {!isUpdate && (
            <div className="form-group">
              <button className="btn btn-success btn-block" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Crear</span>
              </button>
            </div>
          )}

          {isUpdate && (
            <div className="form-group">
              <button
                className="btn btn-info btn-block"
                disabled={loading}
              >
                <span>Actualizar</span>
              </button>

              <button
                className="btn btn-danger btn-block"
                disabled={loading}
                onClick={() => {
                  props.updateList(false, { title: "", _id: "" });
                }}
              >
                <span>Cancelar</span>
              </button>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default CreateList;
