import React from "react";
import { Card, Button } from "react-bootstrap";

const TweetCard = (tweet) => {
  return (
    <Card bg="dark" text="light">
      {/* Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>{tweet.username} tweeted: </Card.Title>
        <Card.Text>{tweet.tweet}</Card.Text>
        <Button variant="primary">Go to tweet!</Button>
      </Card.Body>
    </Card>
  );
};

export default TweetCard;
