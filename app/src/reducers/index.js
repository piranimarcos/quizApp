import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import list from "./list";
import question from "./question";

export default combineReducers({
  auth,
  message,
  list,
  question
});