import { SET_MESSAGE, CLEAR_MESSAGE, SET_MESSAGE_OK } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: { message: payload, messageOk: '' },
      };

    case SET_MESSAGE_OK:
      return {
        ...state,
        message: { message: '', messageOk: payload },
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        message: { message: '', messageOk: '' },
      };

    default:
      return state;
  }
}
