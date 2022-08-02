import logo from './logo.svg';
import './App.css';
import Header from './components/partials/header';
import Footer from './components/partials/footer'; 
import HomeScreen from './components/screens/homeScreen';
import {Container} from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductSceen from './components/screens/productscreen';
import CartScreen from './components/screens/cartScreen';
import LoginScreen from './components/screens/loginScreen';
function App() {
  return (
    <BrowserRouter>
      <Header />
        <Container>
            <main className='py-3'>
              <h1>MERN Shop</h1>
              <Routes>
                  <Route path='/' exact element={<HomeScreen />} />
                  <Route path='/products/:id' element={<ProductSceen />} />
                  <Route path='/cart' element={<CartScreen />} />
                  <Route path='/login' element={<LoginScreen />} />
              </Routes>
            </main>
        </Container>               
      <Footer />
    </BrowserRouter>
  );
}

export default App;
