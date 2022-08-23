import './App.css';
import Header from './components/partials/header';
import Footer from './components/partials/footer'; 
import HomeScreen from './components/screens/homeScreen';
import {Container} from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductScreen from './components/screens/productscreen';
import CartScreen from './components/screens/cartScreen';
import LoginScreen from './components/screens/userLoginScreen';
import RegisterScreen from './components/screens/userRegisterScreen';
import UserProfileScreen from './components/screens/userProfileScreen';
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
              </Routes>
            </main>
        </Container>               
      <Footer />
    </BrowserRouter>
  );
}

export default App;
