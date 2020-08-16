import React from "react";
import { Card, Button } from "react-bootstrap";

const TweetCard = (tweet) => {
  return (
    <Card
      text="dark"
      style={{
        borderRadius: "40px",
        background: "#f2a365",
      }}
    >
      {/* Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body
      // style={{
      //   borderradius: "50px !important",
      // }}
      >
        <Card.Title>{tweet.username} tweeted: </Card.Title>
        <Card.Text>{tweet.tweet}</Card.Text>
        <Button
          style={{
            borderRadius: "50px",
            justifyContent: "center",
            boxShadow: "1px 1px 1px 1px #000000",
          }}
          variant="secondary"
          active
          onClick={() => window.open(tweet.url, "_blank")}
        >
          See Tweet
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TweetCard;
