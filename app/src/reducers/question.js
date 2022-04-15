import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  GET_QUESTION,
  API_FAIL,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_QUESTION:
      return {
        ...state,
      };
    case UPDATE_QUESTION:
      return {
        ...state,
      };
    case GET_QUESTION:
      return {
        ...state,
        question: payload,
      };
    case DELETE_QUESTION:
      return {
        ...state,
        msg: payload.msg,
      };
    default:
      return state;
  }
}
