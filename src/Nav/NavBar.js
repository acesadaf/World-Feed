import React from "react";
import { Navbar, Button } from "react-bootstrap";

const NavBar = ({ isCountryMap, swapMap }) => {
  const image = require("../Images/cartoon-globe.png");
  return (
    <Navbar
      fixed="top"
      style={{
        background: "#222831",
      }}
      // bg="dark"
      // variant="dark"
    >
      <img
        alt="Logo not found"
        src={image}
        width="30"
        className="d-inline-block align-top"
        style={{
          paddingRight: "10px",
        }}
      />
      <Navbar.Brand
        href="#home"
        style={{
          color: "#ebebeb",
          borderColor: "#292929",
          fontSize: "25px",
        }}
      >
        World Feed
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text
          style={{
            padding: "15px",
            color: "white",
          }}
        >
          Map Level: <strong>{isCountryMap ? "Country" : "State"} </strong>
        </Navbar.Text>
        <Button variant="secondary" onClick={swapMap}>
          Switch Map Level
        </Button>
      </Navbar.Collapse>

      {/* <Button
        classname="ml-auto"
        style={{
          float: "right",
        }}
      >
        Hi
      </Button> */}
    </Navbar>
  );
};

export default NavBar;
