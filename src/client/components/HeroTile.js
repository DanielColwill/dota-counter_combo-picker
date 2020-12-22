import React, { Component } from "react";
const axios = require("axios");

class HeroTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      heroName: this.props.heroName,
      winrate: 0,
    };
  }

  getWinrate() {
    var url = "https://api.opendota.com/api/heroes/1/matchups";
    axios.get(url).then((result) => {
      this.setState({
        winrate: 2,
      });
    });
  }

  componentDidMount() {
    // this.getWinrate();
    //console.log(this.props)
  }

  render() {
    console.log(this.state.heroes);
    return (
      <tbody>
        <td>{this.state.heroName}</td>
        <td>{this.state.id}</td>
      </tbody>
    );
  }
}

export default HeroTile;
