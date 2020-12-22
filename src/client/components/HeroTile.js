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

  async getWinrate() {
    var url =
      "https://api.opendota.com/api/heroes/" + this.state.id + "/durations";
    await axios.get(url).then((result) => {});
  }

  getHeroImg(name) {
    var temp = name.toLowerCase();
    var url = "https://api.opendota.com/apps/dota2/images/heroes/";
    var extension = "_full.png";
    console.log(temp);
    switch (temp) {
      case "anti-mage":
        return url + "antimage" + extension;
      case "centaur warrunner":
        return url + "centaur" + extension;
      case "clockwerk":
        return url + "rattletrap" + extension;
      case "doom":
        return url + "doombringer" + extension;
      case "io":
        return url + "wisp" + extension;
      case "lifestealer":
        return url + "life_stealer" + extension;
      case "magnus":
        return url + "magnataur" + extension;
      case "nature's prophet":
        return url + "furion" + extension;
      case "necrophos":
        return url + "necrolyte" + extension;
      case "outworld devourer":
        return url + "obsidian_destroyer" + extension;
      case "queen of pain":
        return url + "queenofpain" + extension;
      case "shadow fiend":
        return url + "nevermore" + extension;
      case "timbersaw":
        return url + "shredder" + extension;
      case "treant protector":
        return url + "treant" + extension;
      case "underlord":
        return url + "abyssal_underlord" + extension;
      case "vengeful spirit":
        return url + "vengefulspirit" + extension;
      case "windranger":
        return url + "windrunner" + extension;
      case "wraith king":
        return url + "skeleton_king" + extension;
      case "zeus":
        return url + "zuus" + extension;
      default:
        temp = temp.replace(/ /g, "_");
        return url + temp + extension;
    }
  }

  render() {
    //this.getWinrate();
    return (
      <tbody>
        <td>
          <img
            class="col-md-2"
            src={this.getHeroImg(this.state.heroName)}
          ></img>
          {this.state.heroName}
        </td>
        <td>{this.state.id}</td>
      </tbody>
    );
  }
}

export default HeroTile;
