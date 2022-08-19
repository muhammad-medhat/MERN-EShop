import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGOUT,
  } from "../const/constants.js";
export const login = (email, password) => async (dispatch) => {
    debugger
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }, 
            method:'POST', 
            body:JSON.stringify({email, password})
        };

        
        const response = await fetch('/api/users/login', config);
        const data = await response.json();

        
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch(error){debugger
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        });
    }

}
export const logout = () => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGOUT
        });
        localStorage.removeItem('userInfo');
    } catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        });
    }
}