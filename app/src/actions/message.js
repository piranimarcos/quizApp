import { SET_MESSAGE, CLEAR_MESSAGE, SET_MESSAGE_OK } from "./types";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});


export const setMessageOk = (message) => ({
  type: SET_MESSAGE_OK,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
