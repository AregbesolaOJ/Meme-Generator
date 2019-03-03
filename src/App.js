import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import MemeGenerator from './MemeGenerator/MemeGenerator';
import Footer from './Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MemeGenerator />
        <Footer />
      </div>
    );
  }
}

export default App;
