import React, { useContext } from "react";
import TweetContext from "./TweetContext";
import TweetCard from "./TweetCard";
// import styled from "styled-components";

// const StyledGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, 220px);
//   grid-gap: 20px;
//   .transition-enter {
//     opacity: 0.01;
//     transform: translate(0, -10px);
//   }
//   .transition-enter-active {
//     opacity: 1;
//     transform: translate(0, 0);
//     transition: all 300ms ease-in;
//   }
//   .transition-exit {
//     opacity: 1;
//     transform: translate(0, 0);
//   }
//   .transition-exit-active {
//     opacity: 0.01;
//     transform: translate(0, 10px);
//     transition: all 300ms ease-in;
//   }
// `;

const TweetList = () => {
  const { tweets, setTweets } = useContext(TweetContext);
  return <div>{tweets.map((tweet) => TweetCard(tweet))}</div>;
};

export default TweetList;
