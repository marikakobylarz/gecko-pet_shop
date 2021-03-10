import React, { useEffect } from "react";
import Product from "../components/Product";
import MessageBox from "../components/MessageBox";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import background1 from "../image/background1.jpg";
import background2 from "../image/background2.jpg";
import background3 from "../image/background3.jpg";
import background4 from "../image/background4.jpg";
import background5 from "../image/background5.jpg";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Carousel
            infiniteLoop={true}
            showArrows
            autoPlay
            showThumbs={false}
            autoplayTimeout={5000}
          >
            <div>
              <img src={background1} alt="banner" />
              <p className="banner1"></p>
            </div>
            <div>
              <img src={background2} alt="banner" />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src={background3} alt="banner" />
              <p className="legend">Legend 3</p>
            </div>
            <div>
              <img src={background4} alt="banner" />
              <p className="legend">Legend 3</p>
            </div>
            <div>
              <img src={background5} alt="banner" />
              <p className="desc51">Zimowa promocja !</p>
              <p className="desc52">Zabawki dla psów -10%</p>
            </div>
          </Carousel>
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeScreen;
