import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import styled from "styled-components";
import { Link } from "@reach/router";

const Button = styled.button`
    postion: relative;
    left: 200px;
    top: 200px;
    height: 50px;
    width: 100px;
    border-radius: 5px;
`;


class Results extends Component {
    render () {
        return (
        <Link to="/">
                <Button>Home</Button>
          </Link>
        )
    }
} export default Results