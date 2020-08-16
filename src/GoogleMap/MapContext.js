import React from "react";

const MapContext = React.createContext({
  tweets: [],
  setTweets: () => {},
});

export default MapContext;
