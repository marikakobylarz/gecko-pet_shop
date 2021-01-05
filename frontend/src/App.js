import { BrowserRouter, Link, Route } from "react-router-dom";
import React from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import logo from "./image/logo.jpg";
import { useSelector } from "react-redux";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="logobox row">
            <img className="logo" src={logo} alt="logo" />
            <Link to="/">
              <h1 className="brand">gecko shop</h1>
              <p className="brand">sklep zoologiczny</p>
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Koszyk
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Zaloguj</Link>
          </div>
          {/* <nav className="row">
            <ul>
              <li>Psy</li>
              <li>Koty</li>
            </ul>
          </nav> */}

          {/* https://unsplash.com/photos/OOE4xAnBhKo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink */}
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          <p>All right reserved</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
