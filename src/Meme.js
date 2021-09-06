import React, { Component } from "react";

class Meme extends Component {
  constructor() {
    super();
    this.state = {
      top: "",
      bottom: "",
      random_img: "http://i.imgflip.com/1bij.jpg",
      alt: [],
    };
    this.memeChange = this.memeChange.bind(this);
    this.change = this.change.bind(this);
  }

  change(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  memeChange(event) {
    event.preventDefault();
    const random = Math.floor(Math.random() * this.state.alt.length);
    const randomMeme = this.state.alt[random].url;
    this.setState({
      random_img: randomMeme,
    });
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          alt: response.data.memes,
        });
      });
  }

  render() {
    return (
      <>
        <form onSubmit={this.memeChange} className="meme-form">
          <input
            type="text"
            name="top"
            value={this.state.top}
            placeholder="(type a text)"
            onChange={this.change}
          />
          <input
            type="text"
            name="bottom"
            value={this.state.bottom}
            placeholder="(type a text)"
            onChange={this.change}
          />
          <button className="gen-button">GEN</button>
        </form>
        <div className="meme">
          <img src={this.state.random_img} alt="" height="400" width ="400" />
          <h2 className="top">{this.state.top}</h2>
          <h2 className="bottom">{this.state.bottom}</h2>
        </div>
        <div >
          <form className ="owner">
            <input type="test" value ="Made with ❤️ Akhil" disabled = "true" className = "input" />
          </form>
        </div>
      </>
    );
  }
}

export default Meme;
