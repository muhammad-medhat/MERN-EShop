import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
} from "../const/constants";
// import axios from "axios";

 export const ListProducts = () => async (dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST });


            //const { data } = await axios.get("/api/products");

            const response = await fetch("/api/products");            
            const data = await response.json();
            
            console.log('products action',data);

            dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });

        } catch (error) {
            dispatch({ 
                type: PRODUCTS_LIST_FAIL, 
                payload: error.response && error.response.data.message 
                    ? error.response.data.message 
                    : error.message 
            });
        }   
    }