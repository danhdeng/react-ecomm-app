import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import webfont from 'webfontloader';
import './App.css';
import { Header } from './component/layout/Header.js';
function App() {
  useEffect(() =>{
    webfont.load({
      google:{
        families:["Roboto", "Doroid Sans", "Chilanka"]
      },
    });
  },[])
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
