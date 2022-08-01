import logo from './logo.svg';
import './App.css';
import Header from './components/partials/header';
import Footer from './components/partials/footer'; 
import HomeScreen from './components/screens/homeScreen';
import {Container} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Header />
        <Container>
            <main className='py-3'>
              <h1>MERN Shop</h1>
              <HomeScreen />
            </main>
        </Container>               
      <Footer />
    </div>
  );
}

export default App;
