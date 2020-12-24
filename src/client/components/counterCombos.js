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
      matchups:[]
    };
  }

  getMatchups(){
    axios.get("http://localhost:4000/matchups/" + this.state.id).then((result) => {
      this.setState({
        matchups: result,
      });
    });
  }

  componentDidMount(){
    this.getMatchups();
  }

  render() {
    console.log(this.state.matchups);
    return (
      <React.Fragment>
        <tr>
          <th scope="col">Combos</th>
          <th scope="col">Counters</th>
          <th scope="col">Winrate</th>
        </tr>
        <tr>
          <td scope="row">Test Hero</td>
          <td scope="row">Test Hero</td>
          <td scope="row">Test Winrate</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default CounterCombo;
