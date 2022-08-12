import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,

  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAIL,
} from "../const/constants";
// import axios from "axios";

 export const ListProducts = () => async (dispatch) => {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST });


            //const { data } = await axios.get("/api/products");

            const response = await fetch("/api/products");            
            const data = await response.json();
            // console.log('products action',data);

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

export const DetailsProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_DETAILS_REQUEST });

        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        // console.log('product action',data);
        dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ 
            type: PRODUCTS_DETAILS_FAIL, 
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        });
    }   
}