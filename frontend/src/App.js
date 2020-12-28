import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <a className="brand" href="/">gekon
                    </a>
                    </div>
                    <div>
                        <a href="/cart">Koszyk</a>
                        <a href="/signin">Zaloguj</a>
                    </div>
                </header>
                <main>
                    <Route path="/product/:id" component={ProductScreen} ></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                </main>
                <footer className="row center">
                    <p>All right reserved</p>
                </footer>

            </div>
        </BrowserRouter >
    );
}

export default App;
