import axios from "axios";
import authHeader from "./auth-header";
import {api} from '../config'

const API_URL = api + "api/lists/";

const user = JSON.parse(localStorage.getItem("user"))

const uid = user ? user.user.uid : ''

const getList = () => {
  return axios.get(`${API_URL}?userId=${uid}`, {headers: authHeader()} );
};

const getListById = (id) => {
  return axios.get(`${API_URL}one?id=${id}`, {headers: authHeader()} );
};

const createList = (data) => {
  data.userId = uid
  return axios.post(API_URL, data, { headers: authHeader() });
};


const updateList = (data) => {
  data.userId = uid
  return axios.put(`${API_URL}${data._id}`, data, { headers: authHeader() });
};

const deleteList = (id) => {
  return axios.delete(`${API_URL}${id}`, { headers: authHeader() });
};

export default {
  getList,
  getListById,
  createList,
  deleteList,
  updateList,
};