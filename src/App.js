// import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
// import Navbar from './components/Navbar';
import React from "react";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Cart from './screens/Cart';   // make sure path is correct
import MyOrder from "./screens/MyOrder";


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
function App() {
  return (
    <CartProvider>

      <Router>
      <div >
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/myOrder" element={<MyOrder/>}/>
        </Routes>
      </div>
      </Router>
    </CartProvider>
  );
}

export default App;
