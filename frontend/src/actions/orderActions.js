import {
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
} from "../const/orderConstants.js";

export const createOrder = (order) => async (dispatch, getState) => {
  // debugger
  //console.log('creating order...', order);
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "POST",
      body: JSON.stringify(order),
    };
    debugger
    const response = await fetch("/api/orders", config);
    if (response.status < 400) {
      const data = await response.json();
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } else {
      throw new Error(response.status + ": " + response.statusText);
    }
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "get",
    };
    // debugger
    const response = await fetch(`/api/orders/${id}`, config);
    if (response.status < 400) {
      const data = await response.json();
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } else {
      throw new Error(response.status + ": " + response.statusText);
    }
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {debugger
    dispatch({
      type: ORDER_PAY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "put",
      body: JSON.stringify(paymentResult)
    };
    // debugger
    const response = await fetch(`/api/orders/${id}/pay`, config);
    if (response.status < 400) {
      const data = await response.json();
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } else {
      throw new Error(response.status + ": " + response.statusText);
    }
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// export const payReset = async(dispatch) => dispatch({
//   type: ORDER_PAY_RESET
// })

export const listOrders = () => async (dispatch, getState) => {
  try {
      dispatch({ type: ORDER_LIST_REQUEST });


      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await fetch("/api/orders", config);            
      const data = await response.json();
      // console.log('products action',data);

      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });

  } catch (error) {
      dispatch({ 
          type: ORDER_LIST_FAIL, 
          payload: error.response && error.response.data.message 
              ? error.response.data.message 
              : error.message 
      });
  }   
}

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type":"application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      method: "put",
      body: JSON.stringify({isDelivered: !order.isDelivered})
    };
    // debugger
    const response = await fetch(`/api/orders/${order._id}/deliver`, config);
    if (response.status < 400) {
      const data = await response.json();
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } else {
      throw new Error(response.status + ": " + response.statusText);
    }
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({type: ORDER_LIST_MY_REQUEST});
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    
    const response = await fetch(`/api/orders/my`, config);
    if (response.status < 400) {
      const data = await response.json();
      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } else {
      throw new Error(response.status + ": " + response.statusText);
    }
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};