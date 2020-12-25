import React, { Component } from "react";
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

  getCombosCounters() {
    if (typeof this.state.matchups[0] !== undefined) {
      this.setState({
        goodCombo:
          this.state.matchups[0].wins / this.state.matchups[0].games_played,
        betterCombo:
          this.state.matchups[0].wins / this.state.matchups[0].games_played,
        bestCombo:
          this.state.matchups[0].wins / this.state.matchups[0].games_played,
      });
      for (var i = 0; i < this.state.matchups.length; i++) {
        if (this.state.matchups[i].games_played > 50) {
          var temp =
            this.state.matchups[i].wins / this.state.matchups[i].games_played;
          console.log(temp);
        }
      }
    }
  }

  render() {
    //this.getCombosCounters();
    return (
      <tbody class="w-100 d-md-table ">
        <tr>
          <th class="text-center">Combos</th>
          <th class="text-center">Counters</th>
          <th class="text-center">Winrate</th>
        </tr>
        <tr>
          <td class="text-center">TEST</td>
          <td class="text-center">TEST</td>
          <td class="text-center">{this.state.winrate}</td>
        </tr>
      </tbody>
    );
  }
}

export default CounterCombo;
