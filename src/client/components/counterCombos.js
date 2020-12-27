import React, { Component } from "react";
import HeroTile from "./HeroTile";
const axios = require("axios");

class CounterCombo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      heroName: this.props.heroName,
      winrate: 0,
      heroes: this.props.heroes,
      matchups: [],
      goodCombo: 0,
      betterCombo: 0,
      bestCombo: 0,
      goodCounter: 0,
      betterCounter: 0,
      bestCounter: 0,
    };
  }

  getMatchups() {
    axios
      .get("http://localhost:4000/matchups/" + this.state.id)
      .then((result) => {
        this.setState({
          matchups: result.data,
        });
      });
  }
  getWinrate() {
    axios
      .get("http://localhost:4000/winrates/" + this.state.id)
      .then((result) => {
        this.setState({
          winrate: result.data,
        });
      });
  }

  componentDidMount() {
    this.getMatchups();
    this.getWinrate();
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  getCombos() {
    var combos = [
      { id: "", winrate: 0 },
      { id: "", winrate: 0 },
      { id: "", winrate: 0 },
    ];
    for (var i = 0; i < this.state.matchups.length; i++) {
      if (this.state.matchups[i].games_played > 50) {
        var temp =
          this.state.matchups[i].wins / this.state.matchups[i].games_played;
        if (temp > combos[combos.length - 1].winrate) {
          combos.push({ id: this.state.matchups[i].hero_id, winrate: temp });
        }
      }
    }
    combos.splice(0, combos.length - 3);
    return combos;
  }

  getCounters() {
    var counters = [
      { id: "", winrate: 1 },
      { id: "", winrate: 1 },
      { id: "", winrate: 1 },
    ];
    for (var i = 0; i < this.state.matchups.length; i++) {
      if (this.state.matchups[i].games_played > 50) {
        var temp =
          this.state.matchups[i].wins / this.state.matchups[i].games_played;

        if (temp < counters[0].winrate) {
          counters.unshift({
            id: this.state.matchups[i].hero_id,
            winrate: temp,
          });
        }
      }
    }

    counters.splice(3, counters.length);
    return counters;
  }

  render() {
    var tempCombo = this.getCombos();
    var tempCounter = this.getCounters();
    return (
      <tbody class="w-100 d-md-table ">
        <tr>
          <th class="text-center">Good Against</th>
          <th class="text-center">Countered By</th>
          <th class="text-center">Winrate</th>
        </tr>
        <tr>
          <td class="border-0">
            {tempCombo.map((index) => {
              var name;
              for (var i = 0; i < this.props.heroes.length; i++) {
                if (this.props.heroes[i].id === index.id) {
                  name = this.props.heroes[i].localized_name;
                }
              }
              if (name !== undefined) {
                return <HeroTile heroName={name} id={index.id} />;
              }
            })}
          </td>
          <td class="border-0">
            {this.props.heroes[tempCounter[0].id] !== undefined
              ? tempCounter.map((index) => {
                  var name;
                  for (var i = 0; i < this.props.heroes.length; i++) {
                    if (this.props.heroes[i].id === index.id) {
                      name = this.props.heroes[i].localized_name;
                    }
                  }

                  return <HeroTile heroName={name} id={index.id} />;
                })
              : null}
          </td>
          <td class="border-0 text-center align-middle">
            {this.state.winrate}
          </td>
        </tr>
      </tbody>
    );
  }
}

export default CounterCombo;
