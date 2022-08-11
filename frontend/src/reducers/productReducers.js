import {
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
} from "../const/constants.js";
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

export const productListReducer = (state = { products: [] }, action) => {
    //switch on type of action
  switch (action.type) {
    // case fetch request is being made
    // action will set the loading state to true (component will know it is loading)
    // and initialize the products array 
    case PRODUCTS_LIST_REQUEST:
      return { loading: true, products: [] };

    // case fetch request is successful
    // action will set the loading state to false (component will know it is not loading)
    // and set the products array to the payload of the action
    case PRODUCTS_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    // case fetch request is unsuccessful (any error will be set to the error state)
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default productListReducer;

/** */
