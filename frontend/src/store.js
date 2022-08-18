import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import { userLoginReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer, 
    login: userLoginReducer
})
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') 
                    ? JSON.parse(localStorage.getItem('cartItems')) 
                    : []    
const userInfoFromLocalStorage = localStorage.getItem('userInfo')
                    ? JSON.parse(localStorage.getItem('userInfo'))
                    : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        userInfo: userInfoFromLocalStorage
    }
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store
/**
endorsement 
Hi MAZHARUL 

 I have read your description and will fulfill your work
 I have developed two e-commerce systems using the MERN stack  
 MERN stack is a combination of MongoDB, Express, React and Node.js
I worked with the backend team in one project to develop the API for the e-commerce system and worked as a Full Stack developer in another project by myself.
both the projects can be found in my portfolio.
just contact me to know more about the projects
Thanks

 */