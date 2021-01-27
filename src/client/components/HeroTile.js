import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import CounterCombo from "./counterCombos";
class HeroTile extends Component {
  constructor(props) {
    super(props);
    this.openToggle = this.openToggle.bind(this);
    this.handler = this.handler.bind(this);
    this.state = {
      id: this.props.id,
      heroName: this.props.heroName,
      winrates: this.props.winrates,
      heroes: this.props.heroes,
      open: false,
      loading: false,
      temp: "",
      winrate: 0,
    };
  }

  getHeroImg(name) {
    var temp = name.toLowerCase();
    var url = "https://api.opendota.com/apps/dota2/images/heroes/";
    var extension = "_full.png";
    switch (temp) {
      case "anti-mage":
        return url + "antimage" + extension;
      case "centaur warrunner":
        return url + "centaur" + extension;
      case "clockwerk":
        return url + "rattletrap" + extension;
      case "doom":
        return url + "doom_bringer" + extension;
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
      case "outworld destroyer":
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

  handler() {
    if (this.state.loading === false && this.state.open === false) {
      this.setState({
        loading: true,
      });
      this.getHero();
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  getHero() {
    this.setState({
      temp: (
        <CounterCombo
          heroes={this.props.heroes}
          heroName={this.props.heroName}
          id={this.props.id}
          handler={() => this.handler()}
          winrates={this.state.winrates}
        />
      ),
    });
  }

  componentDidMount() {
    for (var i = 0; i < this.state.winrates.length; i++) {
      if (this.state.winrates[i].name == this.state.heroName) {
        this.setState({
          winrate: this.state.winrates[i].winrate,
        });
      }
    }
  }

  openToggle() {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  }

  render() {
    return (
      <tbody
        onClick={() => {
          this.handler();
          this.openToggle();
        }}
      >
        <tr>
          <td>
            <img
              class="col-md-2"
              src={this.getHeroImg(this.props.heroName)}
              alt=""
              loading="lazy"
            ></img>
            {this.props.heroName}
          </td>
          <td id="loadingState" class="align-middle">
            {this.state.loading ? (
              <Spinner animation="border" role="status"></Spinner>
            ) : (
              this.state.winrate
            )}
          </td>
        </tr>
        {this.state.open ? this.state.temp : null}
      </tbody>
    );
  }
}

export default HeroTile;
