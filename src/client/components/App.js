import React, { Component } from "react";
import heroData from "../../data/heroes.json";
import HeroTile from "./HeroTile";
import NavbarHeader from "./NavbarHeader";
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.sortAlpha = this.sortAlpha.bind(this);
    this.sortWinrate= this.sortWinrate.bind(this);
    this.sortByKey = this.sortByKey.bind(this);
    this.renderHeroes = this.renderHeroes.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      heroes: [],
      heroName: "",
      id: 0,
      search: "",
      winrates: [],
      alphaToggle: false,
      winrateToggle: false,
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
    if (this.state.alphaToggle === false) {
      this.setState({
        heroes: this.sortByKey(this.state.heroes, "localized_name"),
        alphaToggle: true,
      });
      return;
    } else if (this.state.alphaToggle === true) {
      this.setState({
        heroes: this.state.heroes.reverse(),
        alphaToggle: false,
      });
      return;
    }
  }

  sortWinrate() {
    if (this.state.winrateToggle === false) {
      this.setState({
        heroes: this.sortByKey(this.state.winrates, "winrate"),
        alphaToggle: true,
      });
      return;
    } else if (this.state.winrateToggle === true) {
      this.setState({
        heroes: this.state.heroes.reverse(),
        alphaToggle: false,
      });
      return;
    }
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
                    Heroes{" "}
                    {this.state.alphaToggle ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-up-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-down-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                        />
                      </svg>
                    )}
                  </th>
                  <th class="pl-4" onClick={this.sortWinrate} scope="col">
                    Winrate{" "}
                    {this.state.winrateToggle ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-up-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-down-short"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"
                        />
                      </svg>
                    )}
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
