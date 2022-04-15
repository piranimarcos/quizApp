import axios from "axios";
import authHeader from "./auth-header";
import {api} from '../config'

const API_URL = api;

const getPublicContent = () => {
  return axios.get(API_URL + "titulo");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
};