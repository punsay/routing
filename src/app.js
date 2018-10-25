import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './home';
import "./route.css";
const App = () => (
    <Router>
        <div>
            <ul className="header">
                <li>
                    <h1>Welcome to Routes</h1>
                    <Link to="/home">Home</Link>
                </li>
            </ul>
            <hr/>
            <Route exact path="/home" component={Home} />
        </div>
    </Router>
);

export default App;