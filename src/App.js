import Product from './components/Product';
import data from './data';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LogInScreen from './screens/LogInScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import Header from './components/Header';
import SignUpScreen from './screens/SignUpScreen';
//import SignUpScreen from './screens/SignUpScreen';

function App() {
  return (
    <BrowserRouter> 
    <div className="container"> 
        <Header/>
      
      <main>
        <Routes>
        <Route path = "/favorites/:id" element ={<FavoritesScreen/>} ></Route>
          <Route path = "/product/:id" element ={<ProductScreen/>} ></Route>
          <Route path = "/" element ={<HomeScreen/>} exact> </Route>
          <Route path="/login" element={<LogInScreen/>}></Route>
          <Route path="/signup" element={<SignUpScreen/>}></Route>
        </Routes>
          

      </main>
      <footer className="row center">
          2022 El Mercadito
      </footer>
        </div>
      </BrowserRouter>
  );
}

export default App;
