import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_FAIL,
  CART_UPDATE_ITEM,
  CART_ADD_SHIPPING_ADDRESS, 
  CART_ADD_PAYMENT_METHOD
} from "../const/cartConstants";
// import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const response = await fetch(`/api/products/${id}`);
    const data = await response.json();

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateCartItem = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_UPDATE_ITEM,
      payload: {
        product: id,
        qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const addShippingAddress = (data) => (dispatch) => {
    dispatch({ 
      type: CART_ADD_SHIPPING_ADDRESS, 
      payload: data
    });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
}
export const addPaymentMethod = (data) => (dispatch) => {
    dispatch({ 
      type: CART_ADD_PAYMENT_METHOD, 
      payload: data
    });
    localStorage.setItem("PaymentMethod", JSON.stringify(data));
}
