import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import * as S from "../styles/styles";
import styled from "styled-components";
import { Link } from "@reach/router";
import cloud from "../icons/cloud.png";
// import * as Pictures from '../icons/';

const BackButton = styled.button`
  grid-area: back-button;
  justify-self: right;
`;

const Header = styled.h1`
  grid-area: header;
  font-size: 30px;
`;

const Cloud = styled.img`
  grid-area: letter;
  justify-self: center;
  height: 100px;
  min-padding: 10px;
  
`;

const PictureContainer = styled.div`
  grid-area: picture;
  // grid-colum: span 2;
  display: flex;
  flex-direction: row;
  background-color: blue;
  justify-self: center;
`;

const CurrentLetter = styled.button`
  position = absolute;
  top: 300px;
  left: 50%;
  transform: translate(-50%, 0px); 
`;

const StartButton = styled.button`
  grid-area: letter;
  justify-self: center;
  // top: 20;
  // margin-top: 100px;
  // left: 50%;
  // font-size: 32pt;
  border-radius: 15px;
  height: 50px;
  width: 200px;
  // transform: translate(-50%, 0px); 
  :hover {
    background-color: gray;
  }
`;

const Picture = styled(S.Cloud)`
top: 300px;
left: 30%;
`;

const ImgContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
`;





class Game extends Component {
  constructor () {
    super ()
    this.state = {
      classifications: "a",
      word: "temp",
      CurrentLetter: "",
      started: false,
      img_src: ''
    }
    this.classifyLetter = this.classifyLetter.bind(this)
    this.start = this.start.bind(this)
  }

  start() {
    axios.get('http://localhost:5000/get_word')
    .then(response => {
      this.setState({word: response.data,
                    img_src: "../icons/" + response.data + ".png"})
    })
    this.setState({started: true})
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
        <Link to="/">
          <BackButton>Exit</BackButton>
        </Link>
        <Header>
          ASL 4 Kids 
        </Header>
        <PictureContainer>
          <Cloud src={cloud}/>
          <Cloud src={cloud}/>
        </PictureContainer>
       
       

        {/* <DisplayPicture started={this.started} /> */}
        {!this.state.started && 
          <StartButton onClick={this.start}>MAKE A LION</StartButton>
        }
        <ImgContainer> 
        {this.state.started && 
          <Picture src={require(`../icons/${this.state.word.toLowerCase()}.png`)}/>
        }

        </ImgContainer>


        {/* <CurrentLetter>
          shalom
        </CurrentLetter>
        <StartButton onClick={this.getWordToSign}>
          Start
        </StartButton> */}

      </S.Background>

        
    )
  }
}
export default Game