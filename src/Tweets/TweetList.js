import React, { useContext } from "react";
import TweetContext from "./TweetContext";
import TweetCard from "./TweetCard";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TextTransition, { presets } from "react-text-transition";
import "./tweet.css";
const StyledGrid = styled.div`
  display: grid;
  // grid-template-columns: repeat(auto-fill, 220px);
  paddingleft: 20px;
  grid-gap: 20px;
  align-self: center;
  padding-right: 10px;
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
      <h1
        class="logo"
        style={{
          paddingTop: "35px",
          wordWrap: "break-word",
        }}
      >
        <TextTransition
          text={localStorage.getItem("location")}
          springConfig={presets.wobbly}
        ></TextTransition>
      </h1>
      {tweets.map((tweet) => (
        <CSSTransition timeout={400} in={true} classNames="transition">
          {TweetCard(tweet)}
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default TweetList;
