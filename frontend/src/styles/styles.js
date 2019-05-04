import styled from "styled-components";


export const Background = styled.div`
  text-align: center;
  background-color: #CEEEF2;
  min-height: 100vh;
  min-width: 100vw;
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: 100px 1fr 1fr 1fr 100px;
  grid-template-areas: "back-button header"
                       "picture picture"
                       ". word"
                       ". letter"
                       "footer footer";
`;

export const Button = styled.button`
  background-color:blue;
  border: none;
  color: white;
  text-align: center;
  font-size: 16px;
  height: 40px;
  width: 200px;
  top: 20px;
  float: center;
`;

export const Cloud = styled.img`
  height: 100px;
`;

export const Webcam = styled.div`
  padding-top: 15px;
`;

export const List = styled.ul`
  text-align: center;
  font-family: 'Open Sans';
  font-style: normal;
  font-size: 30px;
  color: white;
`;