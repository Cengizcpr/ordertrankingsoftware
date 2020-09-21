import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Notfound extends Component {
  render() {
    return (
      <div className="error-page">
        <h2 className="headline text-warning"> 404</h2>
        <div className="error-content">
          <h3>
            <i className="fas fa-exclamation-triangle text-warning" /> Oops!
            Böyle Bir sayfa Bulunamadı.
          </h3>
          <p>
            We could not find the page you were looking for. Meanwhile, you may{" "}
            <Link to="/home">return to dashboard</Link> or try using the search
            form.
          </p>
        </div>
      </div>
    );
  }
}
