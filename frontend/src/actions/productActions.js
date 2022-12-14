import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_INIT_REQUEST,
  PRODUCT_INIT_SUCCESS,
  PRODUCT_INIT_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../const/productConstants";
// import axios from "axios";

export const ListProducts =
  (keyword = "", page = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCTS_LIST_REQUEST });

      //const { data } = await axios.get("/api/products");

      const response = await fetch(
        `/api/products?keyword=${keyword}&page=${page}`
      );
      const data = await response.json();
      // console.log('products action',data);

      dispatch({
        type: PRODUCTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCTS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const DetailsProduct = (id) => async (dispatch) => {
  // debugger
  try {
    dispatch({ type: PRODUCTS_DETAILS_REQUEST });

    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();
    // console.log('product action',data);
    dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
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

    const response = await fetch(`/api/products/${id}`, config);
    const data = await response.json();
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });

    // localStorage.setItem("productInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    //debugger
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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
      body: JSON.stringify(product),
    };

    const response = await fetch(`/api/products/${product._id}`, config);
    const data = await response.json();
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });

    // localStorage.setItem("productInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    // debugger;
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "post",
      body: JSON.stringify(product),
    };

    const response = await fetch(`/api/products/`, config);
    if (response.status < 400) {
      const data = await response.json();
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } else {
      throw new Error(response.status + ": " + response.statusText);
    }
    // localStorage.setItem("productInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const initProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_INIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "post",
      body: JSON.stringify({}),
    };

    const response = await fetch(`/api/products/`, config);
    const data = await response.json();
    dispatch({
      type: PRODUCT_INIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_INIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getTopRatedProducts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_TOP_REQUEST,
    });

    const response = await fetch(`/api/products/top`);
    const data = await response.json();
    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
