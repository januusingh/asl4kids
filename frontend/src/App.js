import React, { Component } from 'react';
import { Router, Link } from "@reach/router";
import Home from "./components/Home.js";
import Game from "./components/Game.js";
import Results from "./components/Results.js";
import logo from './logo.svg';
import * as S from "./styles/styles";
import './App.css';

class App extends Component {
  render() {
    return (
      <S.Background>
        <Router>
          <Home path="/" />
          <Game path="/game" />
          <Results path="/results" />
        </Router>
      </S.Background>
    );
  }
}

export default App;
