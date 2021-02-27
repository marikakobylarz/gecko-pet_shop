import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import logo from "./image/logook-rev.jpg";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductScreen from "./screens/ProductScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductListScreen from "./screens/ProductListScreen";
import RegiterScreen from "./screens/RegisterScreen";

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
            <div className="user_box">
              <div className="cart_icon">
                <Link to="/cart">
                  <i className="fa fa-shopping-cart"></i>
                  <br />
                  Koszyk
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </Link>
              </div>

              {userInfo ? (
                <div className="dropdown ">
                  <Link to="#">
                    <i className="fa fa-user"></i>
                    <br />
                    {userInfo.name}
                  </Link>
                  <ul className="dropdown-content logged">
                    <li>
                      <Link to="/profile">Mój profil</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Moje zamówienia</Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Wyloguj
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="dropdown ">
                  <Link to="#">
                    <i className="fa fa-user"></i>
                    <br />
                    Konto
                  </Link>
                  <ul className="dropdown-content">
                    <li className="signin">
                      <p>Jesteś juz użytkownikiem?</p>
                      <Link to="/signin">Zaloguj się</Link>
                    </li>
                    <li className="register">
                      <p>Jesteś tu pierwszy raz?</p>
                      <Link to="/register">Załóż konto</Link>
                    </li>
                  </ul>
                </div>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">
                    <i className="fa fa-cogs"></i>
                    <br />
                    Admin
                  </Link>
                  <ul className="dropdown-content admin">
                    <li>
                      <Link to="/dashboard">Panel sterowania</Link>
                    </li>
                    <li>
                      <Link to="/productlist">Produkty</Link>
                    </li>
                    <li>
                      <Link to="/orderlist">Zamówienia</Link>
                    </li>
                    <li>
                      <Link to="/userlist">Użytkownicy</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <nav className="row">
            <ul className="row">
              <li>
                <Link to="/#">Psy</Link>
              </li>
              <li>
                <Link to="/#">Koty</Link>
              </li>
              <li>
                <Link to="/#">Małe ssaki</Link>
              </li>
              <li>
                <Link to="/#">Ptaki</Link>
              </li>
              <li>
                <Link to="/#">
                  <i className="fas fa-snake"></i>Gady i płazy
                </Link>
              </li>
              <li>
                <Link to="/#">Akwarystyka</Link>
              </li>
            </ul>
          </nav>

          {/* https://unsplash.com/photos/OOE4xAnBhKo?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink */}
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegiterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
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
