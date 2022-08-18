
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }, 
            method:'post', 
            body:JSON.stringify({email, password})
        };

        
        const response = await fetch('/api/user/login', config);
        const data = await response.json();

        localStorage.setItem('userInfo', JSON.stringify(data));
        
        dispatch({type: USER_LOGIN_SUCCESS, payload: data});
    } catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message 
        });
    }

}