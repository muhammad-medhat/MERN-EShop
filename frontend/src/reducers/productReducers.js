import {
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_INIT_REQUEST,
  PRODUCT_INIT_SUCCESS,
  PRODUCT_INIT_RESET,
  PRODUCT_INIT_FAIL,
} from "../const/productConstants.js";
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

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return { loading: true, ...state };

    case PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCTS_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// export default productListReducer;

/** */
export const productDeleteReducer = (state = {}, action) => {
  // debugger;
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  //debugger;
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    // return { loading: false, success: true, product: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = { product: {} }, action) => {
  //debugger;
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_RESET:
      return { };

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const productInitReducer = (state = { product: {} }, action) => {
  //debugger;
  switch (action.type) {
    case PRODUCT_INIT_REQUEST:
      return { loading: true };

    case PRODUCT_INIT_SUCCESS:
      return { loading: false, success: true, product: action.payload };

    case PRODUCT_INIT_RESET:
      return { };
    
    case PRODUCT_INIT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
