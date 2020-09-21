import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    console.log("token silindi");
    window.location.replace("/");
  }
  render(){
    return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  {/* Left navbar links */}
  <ul className="navbar-nav">
   
    <li className="nav-item d-none d-sm-inline-block">
    <Link
                to="/home"
                className="nav-link"
              
              >Anasayfa</Link>
    </li>
   
  </ul>
  
  <ul className="navbar-nav ml-auto">
  <li className="nav-item d-none d-sm-inline-block">
  <Link
                to="/"
                className="nav-link"
                onClick={this.logOut.bind(this)}
              >
                Çıkış Yap
              </Link>
    </li>
  
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
  </ul>
</nav>

    )
}
}
