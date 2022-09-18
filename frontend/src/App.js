import './App.css';
import Header from './components/partials/header';
import Footer from './components/partials/footer'; 
import HomeScreen from './components/screens/homeScreen';
import {Container} from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProductScreen from './components/screens/productscreen';
import CartScreen from './components/screens/cartScreen';
import LoginScreen from './components/screens/userLoginScreen';
import RegisterScreen from './components/screens/userRegisterScreen';
import UserProfileScreen from './components/screens/userProfileScreen';
import ShippingScreen from './components/screens/shippingScreen';
import PaymentScreen from './components/screens/paymentScreen';
import PlaceOrderScreen from './components/screens/palceOrderScreen';
import OrderScreen from './components/screens/orderScreen';
import UserListScreen from './components/screens/admin/usersListScreen';
import UserEditScreen from './components/screens/admin/userEditScreen';
import ProductList from './components/screens/admin/productListScreen';
import ProductCreate from './components/screens/admin/productCreateScreen';
import ProductEdit from './components/screens/admin/productEditScreen';
import OrderList from './components/screens/admin/orders/orderList';
import AdminOrderDetails from './components/screens/admin/orders/orderDetails';
function App() {
  return (
    <BrowserRouter>
      <Header />
        <Container>
            <main className='py-3'>
              <h1>MERN Shop</h1>
              <Routes>
                  <Route path='/' exact element={<HomeScreen />} />
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

                  <Route path='/admin/orders/:id' element={<AdminOrderDetails />} />              
                  <Route path='/admin/orders' element={<OrderList />} />              
                  <Route path='/admin/products/:id/edit' element={<ProductEdit />} />              
                  <Route path='/admin/products/create' element={<ProductCreate />} />              
                  <Route path='/admin/products' element={<ProductList />} />              
                  <Route path='/admin/users' element={<UserListScreen />} />              
                  <Route path='/admin/users/:id/edit' element={<UserEditScreen  />} />              
                </Routes>
            </main>
        </Container>               
      <Footer />
    </BrowserRouter>
  );
}

export default App;
