import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MapContainer from "./maps.js";
import NavBar from "./Nav/NavBar.js";
import maps from "./maps";
import { Card, Button } from "react-bootstrap";
import "./flexbox.css";

function TweetCard() {
  return (
    <Card bg="dark" text="light">
      {/* Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

function App() {
  const cards = [0, 1, 2, 3, 4, 5];
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous"
      ></link>
      <NavBar></NavBar>
      <div
        // style={{
        //   dispaly: "flex",
        //   flexDirection: "row",
        // }}
        class="flexbox-container"
      >
        <div id="left_container">
          <div>{cards.map(TweetCard)}</div>
        </div>
        <div id="map_canvas">
          <MapContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
