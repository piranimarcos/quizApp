import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  GET_LIST,
  API_FAIL,
  GET_ONE_LIST,
} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LIST:
      return {
        ...state,
      };
    case UPDATE_LIST:
      return {
        ...state,
      };
    case GET_LIST:
      return {
        ...state,
        list: payload,
      };
    case GET_ONE_LIST:
      return {
        ...state,
        listPlay: payload,
      };
    case DELETE_LIST:
      return {
        ...state,
        msg: payload.msg,
      };
    default:
      return state;
  }
}
