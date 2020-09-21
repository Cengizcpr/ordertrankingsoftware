import React, { Component } from "react";
import Header from "../homeComponent/Header";
import Menu from "../homeComponent/Menu";
import Content from "../homeComponent/Content";
import jwt_decode from "jwt-decode";

class Home extends Component {
  componentDidMount(e) {
    const token = localStorage.usertoken;
    try {
      jwt_decode(token);
      const decoded = jwt_decode(token);
     
    } catch (error) {
      window.location.replace("/");
    }
  }
  render(){
    return (
      <div>
        <Header />
        <Menu />
        <Content />
      </div>
    );
  }
}
export default Home;