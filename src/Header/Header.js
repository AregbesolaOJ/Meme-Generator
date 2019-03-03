import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="Header">
            <div className="headerContent">
            <img src={require('../assets/meme_logo.JPG')} alt="problem" />
            <h1>Meme Generator!</h1>
            </div>
        </div>
    );
}

export default Header;