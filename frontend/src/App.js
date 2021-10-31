import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import webfont from 'webfontloader';
import { loadUser } from './actions/userAction';
import './App.css';
import { Home } from './component/Home/Home';
import { Footer } from './component/layout/Footer/Footer.js';
import { Header } from './component/layout/Header/Header.js';
import { store } from './store';

function App() {
  const {isAuthenticated, user}=useSelector((state) =>state.user);
  const [stripeApiKey, setStripeApiKey] =useState("");

  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeaipkey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Doroid Sans", "Chilanka"]
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  
  window.addEventListener("contextmenu", (e)=>e.preventDefault());

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
