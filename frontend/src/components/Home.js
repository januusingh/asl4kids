import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import * as S from "../styles/styles";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import rainbow from "../icons/rainbow.png";
import food_cloud from "../icons/food_cloud.png";
import colors_cloud from "../icons/colors_cloud.png";
import animals_cloud from "../icons/animals_cloud.png";
import cloud from "../icons/cloud.png";
import hands from "../icons/hands.png"

const Background = styled.div`
    text-align: center;
    background-color: #CEEEF2;
    min-height: 100vh;
    min-width: 100vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: .8fr 1fr .25fr;
    grid-template-areas: "header header header"
                        "main1 main2 main3"
                        "footer footer footer";
    justify-items: center;
    align-items: center;
`;

const Rainbow = styled.img`
    object-fit: cover;
    height: 95%;
    grid-area: header;
`;

const Cloud = styled.img`
    object-fit: cover;
    width: 65%;
    grid-area: ${props => props.section};
    position: relative;
`;

const TitleText = styled.h1`
    font-size: 7vmin;
    grid-area: header;
    position: relative;
    top: 4vh;
    left: 10px;
`;

const ChooseText = styled.h1`
    position: absolute;
    left: 50%;
    top: 40%;
    font-size: 5vmin;
    transform: translate(-50%, -45px);
`;

const Hands = styled.img`
    object-fit: cover;
    width: 60%;
    grid-area: footer;
`;

class Game extends Component {
    render () {
        return (
            <Background>
                <Rainbow src={rainbow}/>
                <TitleText>  ASL 4 Kids</TitleText>
                <ChooseText>Choose a category:</ChooseText>
                <Link to="/game">
                    <Cloud src={food_cloud} section="main1"/>
                </Link>
                <Cloud src={animals_cloud} section="main2"/>
                <Cloud src={colors_cloud} section="main3"/>
                <Hands src={hands}/>
            </Background>
        )
    }
} export default Game;