import React, { Component } from "react";
import HeroTile from "./HeroTile";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";

const axios = require("axios");
const httpUrl = "";
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  httpUrl = "https://dota-app-combo-counter.herokuapp.com";
} else {
  httpUrl = "http://localhost:4000";
}

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
    };
  }

  getHeroes() {
    axios.get(httpUrl+"/heroes").then((result) => {
      this.setState({
        heroes: result.data,
      });
    });
  }

  componentDidMount() {
    this.getHeroes();
    this.sortAlpha();
    //this.addSearchListener();
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
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            Dota App
            <img
              src="https://1000logos.net/wp-content/uploads/2019/03/Dota-2-Logo.png"
              align="middle"
              height="30"
              alt=""
            ></img>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              onChange={this.updateSearch}
              value={this.state.search}
              is="searchBar"
              id="searchBar"
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
          </Form>
        </Navbar>
        <div class="pt-5 container h-100">
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

                {this.state.heroes.length > 0 ? this.renderHeroes() : null}
              </table>
            </div>
            <div class="col-sm-1"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
