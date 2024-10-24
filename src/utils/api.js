import axios from 'axios';
export const API_BASE_URL= "http://localhost:8080";

export const LOGIN_URL = `${API_BASE_URL}/api/auth/login`;
export const REGISTER_URL = `${API_BASE_URL}/api/auth/register`;
export const TASKS_URL = `${API_BASE_URL}/api/tasks`;