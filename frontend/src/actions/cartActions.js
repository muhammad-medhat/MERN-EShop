import {
CART_ADD_ITEM,CART_REMOVE_ITEM,CART_FAIL,
} from "../const/constants";
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
                    Image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    qty: qty
                }
            });
            localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));


            
        } catch (error) {
            dispatch({ 
                type: CART_FAIL, 
                payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message 
            });
        }   
    }

