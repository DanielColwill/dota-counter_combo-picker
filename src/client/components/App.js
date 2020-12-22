import React, { Component } from "react";
import HeroTile from "./HeroTile";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.sortAlpha = this.sortAlpha.bind(this);
    this.sortByKey = this.sortByKey.bind(this);
    this.state = {
      heroes: [],
      heroName: "",
      id: 0,
      search: "",
    };
  }

  addSearchListener() {
    var self = this;
    var listener = document.getElementById("searchBar");
    listener.addEventListener("change", function () {
      self.setState({ search: document.getElementById("searchBar").value });
      console.log(self.state.search);
    });
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
    this.sortAlpha();
  }

  sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  sortAlpha() {
    this.setState({
      heroes: this.sortByKey(this.state.heroes, "localized_name"),
    });
    console.log(this.state.heroes);
  }

  render() {
    return (
      <div class="container h-100">
        <div class="row h-25 align-items-center">
          <div class="col-sm-2"></div>
          {/* content */}
          <table class="table table-dark" id="heroTable">
            <thead>
              <tr>
                <th onClick={this.sortAlpha} scope="col">
                  Heroes
                </th>
                <th scope="col">Winrate</th>
              </tr>
            </thead>

            {this.state.heroes.map((hero, id) => {
              return <HeroTile heroName={hero.localized_name} id={hero.id} />;
            })}
          </table>
          <div class="col-sm-2"></div>
        </div>
      </div>
    );
  }
}

export default App;
