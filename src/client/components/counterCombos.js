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
    };
  }

  render() {
    return (
      <tbody class="collapse" id={"#app" + this.props.id}>
        <tr>
          <th>Combos</th>
          <th>Counters</th>
        </tr>
        <tr>
          <td scope="row">Test Hero</td>
          <td scope="row">Test Hero</td>
        </tr>
      </tbody>
    );
  }
}

export default CounterCombo;