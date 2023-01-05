import { returnErrors } from "../actions/errorActions";
import axios from "axios";
import {
  CLEAR_ERRORS,
  ADD_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "./types";

export const createStudent =
  ({ name, age, courses, className }) =>
  async (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request body
    const body = JSON.stringify({ name, age, courses, className });
    console.log(body);
    await axios({
      url: "http://localhost:5000/api/student/create",
      data: body,
      headers: config.headers,
      method: "POST",
    })
      .then((res) => {
        const { data } = res.data;
        dispatch({ type: CLEAR_ERRORS });
        dispatch({ type: ADD_STUDENT, payload: [data] });
        dispatch({ type: "STUDENT_CREATED" });
      })
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "STUDENT__ERROR"
          )
        );
      });
  };

export const getStudents = () => (dispatch) => {
  axios({
    url: "http://localhost:5000/api/student",
    method: "GET",
  })
    .then((res) => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch({ type: ADD_STUDENT, payload: res.data });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data.msg, err.response.status))
    );
};

export const updateStudent =
  ({ name, age, className, courses, slug, uid }) =>
  async (dispatch) => {
    // Request body
    const body = JSON.stringify({ name, age, courses, className, slug, uid });

    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios({
      url: "http://localhost:5000/api/student",
      method: "PUT",
      data: body,
      headers: config.headers,
    })
      .then(() => dispatch({ type: UPDATE_STUDENT }))
      .catch((err) => {
        dispatch(
          returnErrors(
            err.response.data.msg,
            err.response.status,
            "UPDATE_ERROR"
          )
        );
      });
  };

export const deleteStudent = (uid) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios({
    url: `http://localhost:5000/api/student/${uid}`,
    method: "DELETE",
    headers: config.headers,
  })
    .then(() => {
      dispatch({
        type: DELETE_STUDENT,
        payload: uid,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
