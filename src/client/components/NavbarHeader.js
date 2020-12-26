import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl } from "react-bootstrap";

class NavbarHeader extends Component {
  constructor(){
    super();
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      search:''
    }
  }
  
  updateSearch (event){
    this.setState({
      search:event.target.value
    })
  }

  render() {
    return (
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
          <FormControl onChange={this.updateSearch} value={this.state.search}  is="searchBar" id="searchBar" type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
      </Navbar>
    );
  }
}
export default NavbarHeader;
