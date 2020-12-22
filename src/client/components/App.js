import React, { Component } from "react";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      winrates: []
    };
  }

  getHeroes() {
    var url = "https://api.opendota.com/api/heroes";
    axios.get(url).then((result) => {
      this.setState({
        heroes: result.data,
      });
    });
  }

  componentDidMount() {
    this.getHeroes();
  }

  render() {
    console.log(this.state.heroes);
    const heroNames = this.state.heroes.map((hero) => (
      <p>{hero.localized_name}</p>
    ));
    return (
      <div class="container h-100">
        <div class="row h-25 align-items-center">
          <div class="col-sm-2"></div>
          {/* content */}
          <table class="table table-dark" id="heroTable">
            <thead>
              <tr>
                <th scope="col">Heroes</th>
                <th scope="col">Winrate</th>
              </tr>
            </thead>
            <tbody>
              <td>{heroNames}</td>
              <td>TestText</td>
            </tbody>
          </table>
          <div class="col-sm-2"></div>
        </div>
      </div>
    );
  }
}

export default App;
