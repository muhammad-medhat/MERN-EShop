import { Container } from 'react-bootstrap';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/partials/footer';
import Header from './components/partials/header';
import CartScreen from './components/screens/cart/cartScreen';
import HomeScreen from './components/screens/homeScreen';
import OrderScreen from './components/screens/order/orderScreen';
import PaymentScreen from './components/screens/order/paymentScreen';
import PlaceOrderScreen from './components/screens/order/palceOrderScreen';
import ProductScreen from './components/screens/productscreen';
import ShippingScreen from './components/screens/order/shippingScreen';
import LoginScreen from './components/screens/user/userLoginScreen';
import UserProfileScreen from './components/screens/user/userProfileScreen';
import RegisterScreen from './components/screens/userRegisterScreen';

import AdminOrderDetails from './components/screens/admin/orders/orderDetails';
import OrderList from './components/screens/admin/orders/orderList';
import ProductCreate from './components/screens/admin/products/productCreateScreen';
import ProductEdit from './components/screens/admin/products/productEditScreen';
import ProductList from './components/screens/admin/products/productListScreen';
import UserEditScreen from './components/screens/admin/userEditScreen';
import UserListScreen from './components/screens/admin/usersListScreen';
import IssueTrackerScreen from './components/screens/issueTracker';
import PaymentSuccessScreen from './components/screens/order/paymentSuccessScreen';
function App() {
  return (
    <BrowserRouter>
      <Header />
        <Container>
            <main className='py-3'>
              <h1>MERN Shop</h1>
              <Routes>
                  <Route path='/' exact element={<HomeScreen />} />
                  <Route path='/page/:page' exact element={<HomeScreen />} />
                  <Route path='/search/:keyword' exact  element={<HomeScreen />} />
                  <Route path='/search/:keyword/page/:page'  element={<HomeScreen />} />
                  <Route path='/products/:id' element={<ProductScreen />} />
                  <Route path='/cart' element={<CartScreen />} />
                  <Route path='/cart/:id' element={<CartScreen />} />
                  <Route path='/cart/:id/?qty=:' element={<CartScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
                  <Route path='/register' element={<RegisterScreen />} />
                  <Route path='/profile' element={<UserProfileScreen />} />
                  <Route path='/shipping' element={<ShippingScreen />} />
                  <Route path='/payment' element={<PaymentScreen />} />
                  <Route path='/placeorder' element={<PlaceOrderScreen />} />
                  <Route path='/order/:id' element={<OrderScreen />} />    
                  <Route path='/paymentsuccess' element={<PaymentSuccessScreen />} />    

                  <Route path='/admin/orders/:id' element={<AdminOrderDetails />} />              
                  <Route path='/admin/orders' element={<OrderList />} />              
                  
                  <Route path='/admin/products/:id/edit' element={<ProductEdit />} />              
                  <Route path='/admin/products/create' element={<ProductCreate />} />  
                  <Route path='/admin/products' exact element={<ProductList /> } />              
                  <Route path='/admin/products/page/:page' element={<ProductList />} />   

                  <Route path='/admin/users' element={<UserListScreen />} />              
                  <Route path='/admin/users/:id/edit' element={<UserEditScreen  />} />              
                  <Route path='/issues' element={<IssueTrackerScreen />} />              
                </Routes>
            </main>
        </Container>               
      <Footer />
    </BrowserRouter>
  );
}

export default App;
