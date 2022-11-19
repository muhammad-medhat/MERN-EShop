import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import SearchBox from "../com/searchBox";
import { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const {value: cartItems} = useLocalStorage('cartItems')

  // const [cartItems, setCartItems] = useLocalStorage('cartItems')
  const [itemsQty, setItemsQty] = useState(0);

  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  //console.log(cartItems);
  

  const nav = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    nav("/login");
  };


  useEffect(()=>{
    // console.log('header useEffect...');
    // debugger;
    // console.log("items count", itemsQty);
    // console.log("cartItems", cartItems);
    cartItems?.length > 0
      ? setItemsQty(() => {
          return cartItems.reduce((acc, x) => acc + x.qty, 0);
        })
      : setItemsQty(0);
    // console.log("items count", itemsQty);
  }, [dispatch, cartItems, itemsQty])

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Mern Shop</Navbar.Brand>
          </LinkContainer>

          <SearchBox />

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/issues">
                <Nav.Link>
                  <i className="fa-solid fa-bug"></i> issues
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">

                <Nav.Link >
                  <i className="fas fa-shopping-cart"></i> Cart
                  <Badge className="mx-1" pill bg="primary">
                    {itemsQty||0}                    
                  </Badge>

                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin Menu" id="adminmenu">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
