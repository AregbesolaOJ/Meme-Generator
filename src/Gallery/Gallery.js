import React from 'react';
import './Gallery.css';

const Gallery = ({ src, id, name, url}) => {
    return (
        <div className="gallery">
            <img src={src} alt={id}/>
            <p><a href={url} target="_blank" rel="noopener noreferrer">{name}</a></p>
        </div>
    )
}

export default Gallery;