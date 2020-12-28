import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';

const ProductScreen = (props) => {
    const product = data.products.find(x => x._id === props.match.params.id);
    if (!product) {
        return <div>Nie znaleziono produktu</div>
    }
    return (
        <div>
            <Link to="/">Powrót</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name} />
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating
                                rating={product.reviews}
                                numReviews={product.numReviews}
                            ></Rating>
                        </li>
                        <li>Cena: {product.price} zł</li>
                        <li>Opis: {product.description}</li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Cena</div>
                                    <div className="price">
                                        {product.price} zł
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status: </div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className="success"> w magazynie</span>
                                        ) : (
                                                <span className="danger">niedostępny</span>
                                            )}
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button className="primary block">Do koszyka</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductScreen;
