import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(8.99);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        {cartItems.length === 0 ? (
          <div className="empty_cart">
            <h2>Koszyk jest pusty.</h2>
            <Link to="/">Idę na zakupy :)</Link>
          </div>
        ) : (
          <div className="cart">
            <h1 className="cart_title">
              Twój koszyk{" "}
              <span className="cart_content">
                {cartItems.reduce((a, c) => a + c.qty, 0)} art.
              </span>
            </h1>
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="small"
                      ></img>
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ fontSize: "1.9rem", fontWeight: "600" }}>
                      {item.price.toFixed(2).toString().replace(".", ",")} zł
                    </div>
                    <div>
                      <button
                        className="trash_bin"
                        type="button"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="cart_summary col-1">
        <div className="card card-body">
          <ul>
            <li>
              <div>
                <dt>cena produktów</dt>
                <dd>
                  {cart.itemsPrice.toFixed(2).toString().replace(".", ",")} zł
                </dd>
              </div>
              <div>
                <dt>cena przesyłki</dt>
                <dd>
                  {cart.shippingPrice.toFixed(2).toString().replace(".", ",")}{" "}
                  zł
                </dd>
              </div>
              <div>
                <dt>Razem</dt>
                <dd>
                  {cart.totalPrice.toFixed(2).toString().replace(".", ",")} zł
                </dd>
              </div>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Zapłać
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
