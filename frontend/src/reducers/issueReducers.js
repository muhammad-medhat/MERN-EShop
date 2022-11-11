import {
  ISSUES_LIST_SUCCESS,
  ISSUES_LIST_FAIL,
  ISSUES_LIST_REQUEST,
  ISSUES_DETAILS_SUCCESS,
  ISSUES_DETAILS_FAIL,
  ISSUES_DETAILS_REQUEST,
  ISSUE_DELETE_FAIL,
  ISSUE_DELETE_REQUEST,
  ISSUE_DELETE_SUCCESS,
  ISSUE_UPDATE_FAIL,
  ISSUE_UPDATE_REQUEST,
  ISSUE_UPDATE_RESET,
  ISSUE_UPDATE_SUCCESS,
  ISSUE_CREATE_REQUEST,
  ISSUE_CREATE_SUCCESS,
  ISSUE_CREATE_FAIL,
  ISSUE_CREATE_RESET,
  ISSUE_INIT_REQUEST,
  ISSUE_INIT_SUCCESS,
  ISSUE_INIT_RESET,
  ISSUE_INIT_FAIL,
  ISSUE_TOP_REQUEST,
  ISSUE_TOP_SUCCESS,
  ISSUE_TOP_RESET,
  ISSUE_TOP_FAIL,
} from "../const/issueConstants.js";
/**
 *
 * @param {*} state
 * state is the current state of the application
 * will be set to the initial state if it is undefined
 * initial state is an empty array
 * @param {*} action
 * action has type and payload
 * @returns
 */

export const issueListReducer = (state = { issues: [], page: '' }, action) => {
  switch (action.type) {

    case ISSUES_LIST_REQUEST:
      return { loading: true, issues: [], page:'' };
    case ISSUES_LIST_SUCCESS:
      return {
        loading: false,
        issues: action.payload.issues,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    // case fetch request is unsuccessful (any error will be set to the error state)
    case ISSUES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const issueDetailsReducer = (
  state = { issue: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ISSUES_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ISSUES_DETAILS_SUCCESS:
      return { loading: false, success:true,  issue: action.payload };

    case ISSUES_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const issueDeleteReducer = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case ISSUE_DELETE_REQUEST:
      return { loading: true };

    case ISSUE_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ISSUE_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const issueUpdateReducer = (state = { issue: {} }, action) => {
  //debugger;
  switch (action.type) {
    case ISSUE_UPDATE_REQUEST:
      return { loading: true };

    case ISSUE_UPDATE_SUCCESS:
      return { loading: false, success: true };
    // return { loading: false, success: true, issue: action.payload };

    case ISSUE_UPDATE_RESET:
      return { issue: {} };

    case ISSUE_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const issueCreateReducer = (state = { issue: {} }, action) => {
  //debugger;
  switch (action.type) {
    case ISSUE_CREATE_REQUEST:
      return { loading: true };

    case ISSUE_CREATE_SUCCESS:
      return { loading: false, success: true, issue: action.payload };

    case ISSUE_CREATE_RESET:
      return { };

    case ISSUE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
