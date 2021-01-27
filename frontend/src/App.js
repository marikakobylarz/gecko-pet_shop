import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import SigninScreen from "./screens/SigninScreen";
import RegiterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import logo from "./image/logook-rev.jpg";
import { signout } from "./actions/userActions";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <div className="header_brand row">
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
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                  </Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={signoutHandler}>
                      Wyloguj
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">Zaloguj</Link>
              )}
            </div>
          </div>
          <nav className="row">
            <ul className="row">
              <li>Psy</li>
              <li>Koty</li>
              <li>Gryzonie</li>
              <li>Ptaki</li>
            </ul>
          </nav>

          {/* https://unsplash.com/photos/OOE4xAnBhKo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink */}
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegiterScreen}></Route>
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
