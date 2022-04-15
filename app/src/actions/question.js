import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  GET_QUESTION,
  API_FAIL,
  SET_MESSAGE,
  SET_MESSAGE_OK,
} from "./types";

import questionService from "../services/question.service";

export const createQuestion = (data) => (dispatch) => {
  return questionService.createQuestion(data).then(
    (data) => {
      dispatch({
        type: CREATE_QUESTION,
        payload: data,
      });


      dispatch({
        type: SET_MESSAGE_OK,
        payload: 'Pregunta creada con éxito',
      });
      

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      console.log(message);

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const updateQuestion = (data) => (dispatch) => {
  return questionService.updateQuestion(data).then(
    (data) => {
      dispatch({
        type: UPDATE_QUESTION,
        payload: data,
      });

      dispatch({
        type: SET_MESSAGE_OK,
        payload: 'Pregunta editada con éxito',
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      console.log(message);

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const getQuestion = (id) => (dispatch) => {
  questionService.getQuestion(id).then(
    (data) => {
      dispatch({
        type: GET_QUESTION,
        payload: data.data,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const deleteQuestion = (id, listId) => (dispatch) => {
  questionService.deleteQuestion(id).then(
    (data) => {

      dispatch(getQuestion(listId))

      dispatch({
        type: SET_MESSAGE_OK,
        payload: 'Pregunta eliminada con éxito',
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};