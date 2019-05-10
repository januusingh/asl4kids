import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import styled from "styled-components";
import { Link, Redirect} from "@reach/router";
import cloud from "../icons/cloud.png";
import Webcam from "react-webcam";

const BackButton = styled.button`
  grid-area: back-button;
  font-size: 28px;
  border-radius: 15%;
  :hover {
    background-color: gray;
  }
`;

const Background = styled.div`
    text-align: center;
    background-color: #CEEEF2;
    min-height: 100vh;
    min-width: 100vw;
    display: grid;
    grid-template-columns: .4fr .6fr .5fr .5fr .4fr .6fr;
    grid-template-rows: .1fr .60fr .15fr .20fr .60fr;
    grid-template-areas: "back-button back-button header header webcam webcam"
                        "cloud1 cloud1 image image webcam webcam"
                        ". . word word classify classify"
                        ". l-text l-text s-text s-text ."
                        ". letter letter sign sign .";
    justify-items: center;
    align-items: center;
`;

const Container = styled.div`
  grid-area: ${props => props.section};
  justify-self: center;
  height: 200px;
  width: 200px;
  border-radius: 15px;
  overflow: hidden;
  background-color: white;
  text-align: center;
`;

const Cloud = styled.img`
  height: 200px;
  grid-area: ${props => props.section};
`;

const Image = styled.img`
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
`;

const ImgContainer = styled(Container)`
  width: auto;
`;

const StartButton = styled.button`
  grid-area: word;
  height: 75px;
  width: 200px;
  border-radius: 20px;
  font-size: 36pt;
  :hover {
    background-color: gray;
  }
`;

const ClassifyButton = styled(StartButton)`
  grid-area: classify;
`;

const Text = styled.h1`
  font-size: ${props => props.font_size};
  grid-area: ${props => props.section};
`;

const Letter = styled(Text)`
  position: relative;
  top: 15%;
  transform: translateY(-50%);
`;

const Word = styled.h1`
  font-size: 56pt;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0px);
`;

const WebcamContainer = styled.div`
  grid-area: webcam;
`;

function UCfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Game extends Component {
  constructor () {
    super ()
    this.state = {
      classifications: "",
      word: "_",
      currentLetter: "",
      started: false,
      correct: false,
      img_src: '',
      checkOrX: "__",
      done: false, 
      displayCorrect: false,
      index: 0
    }
    this.classifyLetter = this.classifyLetter.bind(this)
    this.start = this.start.bind(this)
    this.loop = this.loop.bind(this)
    this.classify = this.classify.bind(this)
  }

  start() {
    axios.get('http://localhost:5000/get_word')
    .then(response => {
      this.setState({word: response.data,
                    currentLetter: response.data.charAt(0),
                    img_src: "../icons/" + response.data + ".png",
                    started: true})
    })

  }

  classify() {

    this.classifyLetter()
    console.log(this.state.correct)
    if (this.state.correct) {
      
      this.setState({checkOrX: "check"})
      axios.get('http://localhost:5000/next_letter')
      .then(response => {
        this.setState({currentLetter: response.data})
        console.log(this.state.currentLetter)
          if (this.state.currentLetter == "Done") {
            this.setState({done: true,
                          currentLetter: ":)"})
            return
          }
      })

      this.setState({correct: false})

    } else {
      this.setState({correct: false})
      this.setState({checkOrX: "X"})
    }
  }

  classifyLetter () {
    axios.get('http://localhost:5000/classify_letter')
      .then(response => {
        console.log(response.data)
        console.log(response.data == "True")
        this.setState({correct: (response.data === "True")})
      })
    console.log("classify")
  }

  render () {
    return (
        <Background>
          <Text font_size='42pt' section='header'>ASL 4 Kids</Text>
          <Link to="/">
            <BackButton>Back</BackButton>
          </Link>
          <Cloud src={cloud} section='cloud1'/>
          <WebcamContainer>
            <Webcam audio={false} height={400} width={400}/>
          </WebcamContainer>

          {!this.state.done && 
            <ClassifyButton onClick={this.classify}>Classify</ClassifyButton>
          }

          {!this.state.started && 
            <StartButton onClick={this.start}>Start</StartButton>
          }
          {this.state.started && 
            <Word>{UCfirst(this.state.word)}</Word>
          }
          <ImgContainer section='image'>
            {this.state.started && 
            <Image src={require(`../icons/${this.state.word.toLowerCase()}.png`)}/>
            }
          </ImgContainer>
          {this.state.started && 
            <Text section='l-text' font_size='30pt'>Current Letter:</Text>
          }
          
          <Container section='letter'>
            <Letter font_size='78pt'>{this.state.currentLetter}</Letter>
          </Container>

          <Container section='sign'>
          <Image src={require(`../icons/${this.state.checkOrX}.png`)}/>
          </Container>


        </Background>
        
    )//}
  }
}
export default Game