import axios from "axios";
import authHeader from "./auth-header";
import {api} from '../config'

const API_URL = api + "api/questions/";

const getQuestion = (lastId) => {
  return axios.get(`${API_URL}?listId=${lastId}`, {headers: authHeader()} );
};

const createQuestion = (data) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};


const updateQuestion = (data) => {
  return axios.put(`${API_URL}${data._id}`, data, { headers: authHeader() });
};


const deleteQuestion = (id) => {
  return axios.delete(`${API_URL}${id}`, { headers: authHeader() });
};


export default {
  getQuestion,
  createQuestion,
  deleteQuestion,
  updateQuestion,
};
