import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import webfont from 'webfontloader';
import './App.css';
import { Header } from './component/layout/Header/Header.js';
import { Footer } from './component/layout/Footer/Footer.js';
import { Home } from './component/Home/Home';

function App() {
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Doroid Sans", "Chilanka"]
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
