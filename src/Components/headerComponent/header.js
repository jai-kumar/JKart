import React, { Component } from 'react';
import M from "materialize-css";

class Header extends Component {

    componentDidMount() {
        // Auto initialize all the things!
        M.AutoInit();
    }
    
  render() {
    return (
        <div>
      	<nav className="light-blue lighten-1" role="navigation">
            <div className="nav-wrapper container"><a id="logo-container" href="" className="brand-logo">JKart</a>
            <ul className="right hide-on-med-and-down">
                <li><a href="javascript:void(0);">Home</a></li>
                <li><a href="javascript:void(0);">About</a></li>
                <li><a href="javascript:void(0);">Contact</a></li>
            </ul>

            <ul id="nav-mobile" className="sidenav">
                <li><a href="javascript:void(0);">Home</a></li>
                <li><a href="javascript:void(0);">About</a></li>
                <li><a href="javascript:void(0);">Contact</a></li>
            </ul>
            <a href="javascript:void(0);" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            </div>
        </nav>
        </div>
    );
  }
}

export default Header;
