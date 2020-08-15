import React from "react";

const TweetContext = React.createContext({
  tweets: [],
  setTweets: () => {},
});

export default TweetContext;
