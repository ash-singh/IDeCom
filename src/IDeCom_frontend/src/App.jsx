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
  const [sellerToggle, setSellerToggle] = useState(false);

  const handleToggleChange = () => {
    setSellerToggle(!sellerToggle);
  };

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
      {/* <button onClick={handleToggleChange}>
        {sellerToggle ? 'Switch to Buyer' : 'Switch to Seller'}
      </button> */}
    </div>

    {/* {sellerToggle && (
      <SellerPage/>
    )}

    {!sellerToggle && (
      <div className="App">
        <h1> Products</h1>
        <ProductsPage/>
      </div>
    )} */}

    </main>
  );
}

export default App;
