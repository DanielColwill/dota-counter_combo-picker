import React, { Component } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

class NavbarHeader extends Component {
  constructor(){
    super();
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      search:''
    }
  }
  
  updateSearch = event =>{
    this.setState({
      search:event.target.value
    })
    console.log(this.state.search);
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
          <FormControl value={this.state.search} onChange={this.updateSearch} is="searchBar" type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    );
  }
}
export default NavbarHeader;
