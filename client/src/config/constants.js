// API ENDPOINTs
export const API_ENDOINT = "http://localhost:5000/api";
export const SIGN_IN_ENDPOINT = () => `/auth/signin`;
export const REGISTER_USER_ENDPOINT = () => `/auth/createUser`;
export const FORGOT_PASSWORD_ENDPOINT = () => `/auth/forgotpassword`;
export const RESET_PASSWORD_ENDPOTINT = () => `/auth/resetPassword`;
export const GET_STUDENTS_API = () => `/student/`;
export const GET_USERS_API = () => `/user/`;
export const CATEGORY_API = () => `/category/`;
export const PROGRAMS_API = () => `/program/`;
export const NOTES_API = (id) => `/student/${id}/note`;
export const DOCS_API = (id) => `/student/${id}/doc`;
export const DOWNLOAD_API = (id) => `/doc/${id}`;
export const NOTES_API_ID = (id, noteid) => `/student/${id}/note/${noteid}`;
export const SEARCH_STUDENT_API = () => `/student/find/`
export const DATA_IMPORT_API = () => `/dataimport`
export const GET_INTAKE_API = () => `/student/intake`
export const EMAIL_CAMPAIGN = () => `/student/email`

// Define all other constants here
export const SYSTEM_ERROR = "System error. Please try again later!";

// Define all navigation routes here
export const ROUTES = {
  SIGN_IN: "/login",
  FORGOT_PASSWORD: "/forgotPassword",
  RESET_PASSWORD: "/resetPassword",
  DASHBOARD: "/",
  ADD_STUDENT: "/addStudent",
  ADD_NOTE: "/student/notes/add",
  DELETE_NOTE: "/student/notes/delete",
  EMAIL_CAMPAIGN: "/email",
  STUDENT_NOTES: "/student/notes",
  STUDENT_PROFILE: "/student/profile",
  STUDENT_DOCS: "/student/docs",
  ADMIN: "/admin",
  VIEW_ADMIN: "/admin/view",
  ADD_ADMIN: "/admin/add",
  NOT_FOUND: "*",
};
