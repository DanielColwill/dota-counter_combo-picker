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
    axios.get("http://localhost:4000/heroes").then((result) => {
      this.setState({
        heroes: result.data,
      });
    });
  }

  componentDidMount() {
    this.getHeroes();
    this.sortAlpha();
    this.addSearchListener();
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
  }

  renderHeroes() {
    var list = [];
    if (this.state.search.length === 0) {
      {
        this.state.heroes.map((hero, id) => {
          return <HeroTile heroName={hero.localized_name} id={hero.id} />;
        });
      }
    } else {
      for (var i = 0; i < this.state.heroes; i++) {
        if (this.state.heroes.localized_name[i].includes(this.state.search)) {
          list.push(this.state.heroes[i]);
        }
      }
      {
        this.state.list.map((hero, id) => {
          return <HeroTile heroName={hero.localized_name} id={hero.id} />;
        });
      }
    }
  }

  render() {
    return (
      <div class="container h-100">
        <div class="row h-25 align-items-center">
          <div class="col-sm-1"></div>
          {/* content */}
          <div class="table-responsive">
            <table
              class="table table-hover table-dark w-100 d-block d-md-table"
              id="heroTable"
            >
              <thead>
                <tr>
                  <th class="pl-4" onClick={this.sortAlpha} scope="col">
                    Heroes
                  </th>
                </tr>
              </thead>

              {this.renderHeroes}

              {this.state.heroes.map((hero, id) => {
                return <HeroTile heroName={hero.localized_name} id={hero.id} />;
              })}
              
            </table>
          </div>
          <div class="col-sm-1"></div>
        </div>
      </div>
    );
  }
}

export default App;
