import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import Webcam from "react-webcam"
import * as S from "../styles/styles";
import styled from "styled-components";
import { navigate } from "@reach/router"

const Header = styled.h1`
  position: absolute;
  top: 125px;
  left: 50%;
  transform: translate(-50%, 0px);
  font-size: 30px;
`;

const CurrentLetter = styled.button`
  position = absolute;
  top: 300px;
  left: 50%;
  transform: translate(-50%, 0px); 
`;

const StartButton = styled.button`
  position = absolute;
  top: 20;
  margin-top: 100px;
  left: 50%;
  transform: translate(-50%, 0px); 
`;

class Game extends Component {
  constructor () {
    super ()
    this.state = {
      classifications: "a",
      word: "",
      CurrentLetter: ""
    }
    this.classifyLetter = this.classifyLetter.bind(this)
  }

  getWordToSign() {
    axios.get('http://localhost:5000/get_word')
    .then(response => {
      this.setState({word: response.data})
    })
  }

  classifyLetter () {
    axios.get('http://localhost:5000/classify_letter')
      .then(response => {
        this.setState({classifications: response.data})
      })
    
  }

  render () {
    return (
      <S.Background>
        <Header>
          ASL 4 Kids
        </Header>
        <CurrentLetter>
          shalom{/* {this.state.classifications} */}
        </CurrentLetter>
        <StartButton>
          StartButton
        </StartButton>

      </S.Background>

        
    )
  }
}
export default Game