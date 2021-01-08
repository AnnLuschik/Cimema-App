import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import image from '../../../images/404.png';

export function NotFoundPage() {
  return (
    <Container>
      <TextContainer>
        <StyledTitle>Ooops!</StyledTitle>
        <StyledText>Looks like you are lost</StyledText>
        <StyledLink to="/">Back home</StyledLink>
      </TextContainer>
      <StyledImg alt="" src={image} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 90vh;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  margin-bottom: 15px;
`;

const StyledTitle = styled.p`
  margin-bottom: 25px;
  font-weight: 900;
  font-size: calc(60px + 2.2vw);
  color: #3F806D;
  text-transform: uppercase;
`;

const StyledText = styled.p`
  margin-bottom: 50px;
  font-weight: 400;
  font-size: calc(20px + 0.7vw);
  color: #3F806D;
  text-transform: none;
`;

const StyledImg = styled.img`
  width: 37vw;
  height: 30vw;

  @media (max-width: 600px) {
    width: 75vw;
    height: 70vw;
  }
`;

const StyledLink = styled(Link)`
  justify-self: bottom;
  padding: 10px 15px;
  color: #FFFFFF;
  background: #3F806D;
  text-decoration: none;

  &:hover {
    background: #5aa78f;
  } 
`;
