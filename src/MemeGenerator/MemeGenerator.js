import React from 'react';
import './MemeGenerator.css';
import Gallery from '../Gallery/Gallery';


class MemeGenerator extends React.Component {
    state = {
        topText: '',
        bottomText: '',
        randomImage: require('../assets/meme1.jpg'),
        allMemeImages: [],
        isLoading: false,
        isSuccessful: false,
        isShowing: false
    }
    componentDidMount () {
        const memeURI = "https://api.imgflip.com/get_memes";
        fetch(memeURI)
            .then(this.checkStatus)
            .then(response => response.json())
            .then(response => response.data)
            .then(data => {
                console.log(data.memes)
                const memes = data.memes;
                this.setState({
                    allMemeImages: memes
                })    
            })
            .catch(error => console.log('Looks like there was a problem!', error))
    }
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.topText !== '' & this.state.topText !== '') {
            this.setState({ isLoading: true })
        }
        const randomImage = Math.floor(Math.random() * this.state.allMemeImages.length);
        const chosenRandomImage = this.state.allMemeImages[randomImage].url;
        this.setState({
            randomImage: chosenRandomImage,
            isLoading: false,
            isSuccessful: true
        })
    }
    handleGalleryView = () => {
        this.setState( prevState => {
            return {
                isShowing: !prevState.isShowing
            }
        })
    }
    checkStatus = (response) => {
        if(response.ok) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(new Error(response.statusText));
        }
    }
    render () {
        const allMemes = this.state.allMemeImages.map(meme => (
            <Gallery    key={meme.id} 
                        src={meme.url} 
                        id={meme.id} 
                        name={meme.name} 
                        url={meme.url}
            />
        ))
        return (
            <div className="MemeGenerator">

                <div className="meme-success">{this.state.isSuccessful ? "Good One! Your Meme was succesfully Generated, feel free and try again..." : null}</div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" 
                           value={this.state.topText} 
                           name="topText"
                           placeholder="Top Text" 
                           onChange={this.handleChange} 
                           required
                    />

                    <input type="text" 
                           value={this.state.bottomText} 
                           name="bottomText"
                           placeholder="Bottom Text" 
                           onChange={this.handleChange} 
                           required
                    />

                    <button>{this.state.isLoading ? "Loading..." : "Generate!"}</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="meme-topText">{this.state.topText}</h2>
                    <h2 className="meme-bottomText">{this.state.bottomText}</h2>
                </div>
                <p onClick={this.handleGalleryView}>{this.state.isShowing === false ? "View Entire Meme Gallery!" : "Close Meme Gallery!"}</p>
                <div className="meme-gallery">
                    {this.state.isShowing === false ? null : allMemes}
                </div>
            </div>
        );    
    }
}

export default MemeGenerator;