import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MapContainer from "./GoogleMap/maps.js";
import NavBar from "./Nav/NavBar.js";
import maps from "./GoogleMap/maps";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card, Button } from "react-bootstrap";
import "./flexbox.css";
import TweetContext from "./Tweets/TweetContext";
import TweetList from "./Tweets/TweetList";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

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

const App = () => {
  const [tweets, setTweets] = useState([
    // { username: "sadaf", tweet: "hi", url: "https://www.twitter.com" },
    // { username: "halim", tweet: "hey", url: "https://www.twitter.com" },
  ]);

  const [isCountryMap, setMapState] = useState(false);
  const swapMap = () => {
    setMapState(!isCountryMap);
  };
  if (localStorage.getItem("location") === null)
    localStorage.setItem("location", "pick a place!");
  const tweetValue = { tweets, setTweets };
  const cards = [0, 1, 2, 3, 4, 5];
  return (
    <div class="main">
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
        crossorigin="anonymous"
      ></link>
      <script
        src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
        integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV"
        crossorigin="anonymous"
      ></script>

      <TweetContext.Provider value={tweetValue}>
        <NavBar isCountryMap={isCountryMap} swapMap={swapMap}></NavBar>
        <div
          style={{
            paddingTop: "60px",
          }}
          // style={{
          //   dispaly: "flex",
          //   flexDirection: "row",
          // }}
          class="flexbox-container"
        >
          <div class="left_container">
            {/* <div>{cards.map(TweetCard)}</div> */}
            <TweetList />
          </div>
          <div id="mapback" class="map_canvas">
            <MapContainer
              zoom={isCountryMap ? 4 : 7}
              minZoom={isCountryMap ? 3 : 5}
              maxZoom={isCountryMap ? 5 : 8}
            />
          </div>
        </div>
      </TweetContext.Provider>
    </div>
  );
};

export default App;
