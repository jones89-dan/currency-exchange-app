import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './Home.js';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Currency Finder</Link>
      </nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
