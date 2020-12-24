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

  componentDidMount() {
    this.getMatchups();
  }

  getCombosCounters() {
    var goodCombo,
      betterCombo,
      bestCombo,
      goodCounter,
      betterCounter,
      bestCounter;
    for (var i = 0; i < this.state.matchups.length; i++) {
      if (this.state.matchups.data[i].games_played > 50) {
        var temp;
        temp =
          this.state.matchups.data[i].wins /
          this.state.matchups.data[i].games_played;
        if (temp > goodCombo) {
          goodCombo = temp;
        }
      }
    }
  }

  render() {
    console.log(this.state.matchups);
    return (
        <tbody class="w-100 d-md-table">
          <tr>
            <th >Combos</th>
            <th >Counters</th>
            <th >Winrate</th>
          </tr>
          <tr >
            <td >TEST</td>
            <td >TEST</td>
            <td >1</td>
          </tr>
        </tbody>

    );
  }
}

export default CounterCombo;
