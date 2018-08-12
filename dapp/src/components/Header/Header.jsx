import React, { Component } from "react";

import "./Header.css";

export default class Header extends Component {
    render() {
        return (
            <nav className="Header navbar sticky-top">
                <img className="logo"
                     alt="Dharma Logo"
                     src={require("../../assets/logo_color.png")}
                />

                Crowd Lending
            </nav>
        );
    }
}
