import React, { Component } from "react";
import HeroTile from "./HeroTile";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      heroName: "",
      id: 0
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
    //console.log(this.state.winrates);
/*     const heroNames = this.state.heroes.map((hero) => (
      <p>{hero.localized_name}</p>
    )); */

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
              {this.state.heroes.map((hero, id) => {
                return <HeroTile heroName={hero.localized_name} id={id} />;
              })}
          </table>
          <div class="col-sm-2"></div>
        </div>
      </div>
    );
  }
}

export default App;
