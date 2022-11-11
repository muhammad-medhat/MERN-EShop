import {
  ISSUES_LIST_REQUEST,
  ISSUES_LIST_SUCCESS,
  ISSUES_LIST_FAIL,
  ISSUES_DETAILS_REQUEST,
  ISSUES_DETAILS_SUCCESS,
  ISSUES_DETAILS_FAIL,
  ISSUE_DELETE_FAIL,
  ISSUE_DELETE_REQUEST,
  ISSUE_DELETE_SUCCESS,
  ISSUE_UPDATE_FAIL,
  ISSUE_UPDATE_REQUEST,
  ISSUE_UPDATE_SUCCESS,
  ISSUE_DETAILS_SUCCESS,
  ISSUE_CREATE_SUCCESS,
  ISSUE_CREATE_FAIL,
  ISSUE_CREATE_REQUEST,
  ISSUE_CREATE_RESET,
  ISSUE_INIT_REQUEST,
  ISSUE_INIT_SUCCESS,
  ISSUE_INIT_FAIL,
  ISSUE_TOP_REQUEST,
  ISSUE_TOP_SUCCESS,
  ISSUE_TOP_FAIL,
} from "../const/issueConstants";
// import axios from "axios";

export const ListIssues =
  (keyword = "", page = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ISSUES_LIST_REQUEST });

      //const { data } = await axios.get("/api/issues");

      const response = await fetch(
        `/api/issues?keyword=${keyword}&page=${page}`
      );
      const data = await response.json();
      // console.log('issues action',data);

      dispatch({
        type: ISSUES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ISSUES_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const DetailsIssue = (id) => async (dispatch) => {
  // debugger
  try {
    dispatch({ type: ISSUES_DETAILS_REQUEST });

    const response = await fetch(`/api/issues/${id}`);
    const data = await response.json();
    // console.log('issue action',data);
    dispatch({ type: ISSUES_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ISSUES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteIssue = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ISSUE_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "delete",
    };

    const response = await fetch(`/api/issues/${id}`, config);
    const data = await response.json();
    dispatch({
      type: ISSUE_DELETE_SUCCESS,
      payload: data,
    });

    // localStorage.setItem("issueInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ISSUE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateIssue = (issue) => async (dispatch, getState) => {
  try {
    //debugger
    dispatch({
      type: ISSUE_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "put",
      body: JSON.stringify(issue),
    };

    const response = await fetch(`/api/issues/${issue._id}`, config);
    const data = await response.json();
    dispatch({
      type: ISSUE_UPDATE_SUCCESS,
      payload: data,
    });

    // localStorage.setItem("issueInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ISSUE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createIssue = (issue) => async (dispatch, getState) => {
  try {
    // debugger;
    dispatch({ type: ISSUE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "post",
      body: JSON.stringify(issue),
    };

    const response = await fetch(`/api/issues/`, config);
    if (response.status < 400) {
      const data = await response.json();
      dispatch({
        type: ISSUE_CREATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: ISSUE_DETAILS_SUCCESS,
        payload: data,
      });
    } else {
      throw new Error(response.status + ": " + response.statusText);
    }
    // localStorage.setItem("issueInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ISSUE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

