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
      goodCombo:0,
      betterCombo:0,
      bestCombo:0,
      goodCounter:0,
      betterCounter:0,
      bestCounter:0
    };
  }

  getMatchups() {
    axios
      .get("http://localhost:4000/matchups/" + this.state.id)
      .then((result) => {
        this.setState({
          matchups: result,
        });
      });
  }
  getWinrate(){
    axios
    .get("http://localhost:4000/winrates/" + this.state.id)
    .then((result) => {
      this.setState({
        winrate: result.data,
      });
    });
  }

  componentDidMount() {
    //this.getMatchups();
    this.getWinrate()
  }

  getCombosCounters() {
    this.setState({
      goodCombo: this.state.matchups.data[0].wins / this.state.matchups.data[0].games_played,
      betterCombo: this.state.matchups.data[0].wins / this.state.matchups.data[0].games_played,
      bestCombo: this.state.matchups.data[0].wins / this.state.matchups.data[0].games_played
    });
    for (var i = 0; i < this.state.matchups.length; i++) {
      if (this.state.matchups.data[i].games_played > 50) {
        var temp = this.state.matchups.data[i].wins / this.state.matchups.data[i].games_played;
      }

    }
    return 
  }

  render() {
    return (
      <tbody class="w-100 d-md-table">
        <tr>
          <th>Combos</th>
          <th>Counters</th>
          <th>Winrate</th>
        </tr>
        <tr>
          <td>TEST</td>
          <td>TEST</td>
          <td>{this.state.winrate}</td>
        </tr>
      </tbody>
    );
  }
}

export default CounterCombo;
