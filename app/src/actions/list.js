import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  GET_LIST,
  GET_ONE_LIST,
  API_FAIL,
  SET_MESSAGE,
  SET_MESSAGE_OK,
} from "./types";

import listService from "../services/list.service";

export const createList = (data) => (dispatch) => {
  return listService.createList(data).then(
    (data) => {
      dispatch({
        type: CREATE_LIST,
        payload: data,
      });

      dispatch({
        type: SET_MESSAGE_OK,
        payload: 'Cuestionario creado con éxito',
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


export const updateList = (data) => (dispatch) => {
  return listService.updateList(data).then(
    (data) => {
      dispatch({
        type: UPDATE_LIST,
        payload: data,
      });


      dispatch({
        type: SET_MESSAGE_OK,
        payload: 'Cuestionario editado con éxito',
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


export const getList = () => (dispatch) => {
  listService.getList().then(
    (data) => {
      dispatch({
        type: GET_LIST,
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


export const getOneList = (id) => (dispatch) => {
  listService.getListById(id).then(
    (data) => {
      dispatch({
        type: GET_ONE_LIST,
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


export const deleteList = (id) => (dispatch) => {
  listService.deleteList(id).then(
    (data) => {

      dispatch(getList())


      dispatch({
        type: SET_MESSAGE_OK,
        payload: 'Cuestionario eliminado con éxito',
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