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

  getCombosCounters() {
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
          console.log(this.state.matchups[i]);
          combos.push({ id: this.state.matchups[i].hero_id, winrate: temp });
        }
      }
    }
    console.log("length: " + combos.length);
    for (var i = combos.length - 1; i > combos.length - 4; i--) {
      console.log(combos[i]);
    }
    combos.splice(0, combos.length - 3);
    return combos;
  }

  test() {
    var combos = [
      { id: "", winrate: 0.76 },
      { id: "", winrate: 0.5 },
      { id: "", winrate: 0.32 },
      { id: "", winrate: 0.89 },
      { id: "", winrate: 0.11 },
      { id: "", winrate: 0.27 },
      { id: "", winrate: 0.66 },
    ];
    for (var j = 0; j < combos.length; j++) {
      console.log(combos[j]);
    }
    this.sortByKey(combos, "winrate");
    for (var j = 0; j < combos.length; j++) {
      console.log(combos[j]);
    }
  }

  render() {
    var temp = this.getCombosCounters();
    console.log(temp);
    console.log(this.props.heroes);
    //console.log(this.props.heroes[temp[0].id].localized_name);
    //console.log(this.props.heroes[temp[0].id]);
    //console.log(temp[temp.length - 1]);
    //this.test();
    return (
      <tbody class="w-100 d-md-table ">
        <tr>
          <th class="text-center">Good Against</th>
          <th class="text-center">Countered By</th>
          <th class="text-center">Winrate</th>
        </tr>
        <tr>
          {this.props.heroes[temp[0].id] !== undefined
            ? temp.map((index) => {
                var name;
                for (var i = 0; i < this.props.heroes.length; i++) {
                  if (this.props.heroes[i].id === index.id) {
                    name = this.props.heroes[i].localized_name;
                  }
                }

                return <HeroTile heroName={name} id={index.id} />;
              })
            : null}

          <td class="text-center">TEST</td>
          <td class="text-center">{this.state.winrate}</td>
        </tr>
      </tbody>
    );
  }
}

export default CounterCombo;
