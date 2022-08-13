import React, {useEffect} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Button, Image, Form} from 'react-bootstrap';
import {addToCart} from '../../actions/cartActions';
const CartScreen = () => {
    const pid = useParams().id;
    const location = useLocation();
    console.log("location", location);
    // const qty = new URLSearchParams(location.search).get('qty');

    const { search } = useLocation();
    const qty = search ? Number(search.split("=")[1]) : 1;
    console.log("qty", qty);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;


    useEffect(() => {
        if(pid){
            dispatch(addToCart(pid, qty));
        }
    } , [dispatch, pid, qty]);
    return (  
        <>
        <h2>Shopping Cart</h2>-

        {JSON.stringify(cartItems)}
            </>
    );
}
 
export default CartScreen;