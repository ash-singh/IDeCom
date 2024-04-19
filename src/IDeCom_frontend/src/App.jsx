import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import { SellerPage } from './Components/Seller/Seller';
import SingleProduct from './Components/Product/SingleProduct';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/Checkout/Checkout';

function App() {
  return (
    <main>
      <Router>
      <Provider store={store}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:id" element={<SingleProduct />}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/seller" element={<SellerPage/>}></Route>
        </Routes>
        </Provider>
      </Router>
    <div>
    </div>

    </main>
  );
}

export default App;
