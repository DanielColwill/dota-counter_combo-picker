import React, { Component } from "react";
import heroData from "../../data/heroes.json";
import HeroTile from "./HeroTile";
import NavbarHeader from "./NavbarHeader";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.sortAlpha = this.sortAlpha.bind(this);
    this.sortByKey = this.sortByKey.bind(this);
    this.renderHeroes = this.renderHeroes.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      heroes: [],
      heroName: "",
      id: 0,
      search: "",
      winrates:[]
    };
  }

  getHeroes() {
    //using local json so don't have to request for hero data which stays relatively static
    this.setState({
      heroes: heroData,
    });
    //using external api
    // axios.get("http://localhost:4000/heroes").then((result) => {
    //   this.setState({
    //     heroes: result.data,
    //   });
    // });
  }
  async getWinrates() {
    await axios.get("http://localhost:4000/winrates").then((result) => {
      this.setState({
        winrates: result.data,
      });
    });
  }

  componentDidMount() {
    this.getHeroes();
    this.getWinrates();
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
      return this.state.heroes.map((hero, id) => {
        return (
          <HeroTile
            heroes={this.state.heroes}
            heroName={hero.localized_name}
            id={hero.id}
            winrates={this.state.winrates}
          />
        );
      });
    } else if (this.state.search.length > 0) {
      for (var i = 0; i < this.state.heroes.length; i++) {
        if (
          this.state.heroes[i].localized_name
            .toLowerCase()
            .includes(this.state.search)
        ) {
          list.push(this.state.heroes[i]);
        }
      }

      return list.map((hero, id) => {
        return (
          <HeroTile
            heroes={this.state.heroes}
            heroName={hero.localized_name}
            id={hero.id}
            winrates={this.state.winrates}
          />
        );
      });
    }
  }

  updateSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  render() {
    const layout = (
      <div class="pt-5 container h-100">
        <div class="row h-25 align-items-center">
          <div class="col-xs-1"></div>
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
              {this.state.heroes.length > 0 ? this.renderHeroes() : null}
            </table>
          </div>
          <div class="col-xs-1"></div>
        </div>
      </div>
    );

    return (
      <div>
        <NavbarHeader
          search={this.state.search}
          updateSearch={this.updateSearch}
        />
        {layout}
      </div>
    );
  }
}

export default App;
