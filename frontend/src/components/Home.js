import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import * as S from "../styles/styles";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { Link } from "@reach/router";
import rainbow from "../icons/rainbow.png";
import cloud from "../icons/cloud.png";

const Rainbow = styled.img`
  position: absolute;
  height: 200px;
  top: 30px
  left: 50%;
  transform: translate(-50%, 0px);
`;

const Cloud1 = styled(S.Cloud)`
  top: 300px;
  left: 30%;
  
`;

const Cloud2 = styled(S.Cloud)`
top: 300px;
left: 50%;
`;

const Cloud3 = styled(S.Cloud)`
top: 300px;
left: 70%;
`;

const Header = styled.p`
  position: absolute;
  top: 125px;
  left: 50%;
  transform: translate(-50%, 0px);
  font-size: 30px;
`;
const Text = styled.p`
  position: absolute;
  top: 225px;
  left: 50%;
  transform: translate(-50%, 0px);
  font-size: 30px;
`;

const Home = () => (
  <S.Background>
    <Rainbow src={rainbow} />
    <Header>ASL 4 Kids</Header>
    <Text>Choose a category</Text>
    <Link to="/categories">
      <Cloud1 src={cloud}/>
    </Link>
    <Cloud2 src={cloud} />
    <Cloud3 src={cloud} />
    

  </S.Background>
); export default Home;