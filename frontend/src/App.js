import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Footer from './components/footer'; 
import {Container} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Header />
        <Container>
            <main className='py-3'>
              <h1>MERN Shop</h1>
            </main>
        </Container>               
      <Footer />
    </div>
  );
}

export default App;
