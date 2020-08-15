import React, { useContext } from "react";
import TweetContext from "./TweetContext";
import TweetCard from "./TweetCard";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
const StyledGrid = styled.div`
  display: grid;
  //grid-template-columns: repeat(auto-fill, 220px);
  grid-gap: 20px;
  .transition-enter {
    opacity: 0.01;
    transform: translate(0, -10px);
  }
  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 400ms ease-in;
  }
  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }
  .transition-exit-active {
    opacity: 0.01;
    transform: translate(0, 10px);
    transition: all 400ms ease-in;
  }
`;

const TweetList = () => {
  const { tweets, setTweets } = useContext(TweetContext);
  return (
    <TransitionGroup component={StyledGrid}>
      {tweets.map((tweet) => (
        <CSSTransition timeout={400} in={true} classNames="transition">
          {TweetCard(tweet)}
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default TweetList;
