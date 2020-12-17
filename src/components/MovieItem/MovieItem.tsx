import React from 'react';
import styled from 'styled-components';
import { IMovieItem } from '../../Movie';

export function MovieItem({
  title, genres, release_date, poster_path,
}: IMovieItem) {
  return (
    <MovieCard>
      <ImageContainer imagePath={poster_path} />
      <DataContainer>
        <TextContainer>
          <StyledTitle>{title}</StyledTitle>
          <StyledText>{genres}</StyledText>
        </TextContainer>
        <YearContainer>
          <span>{release_date}</span>
        </YearContainer>
      </DataContainer>
    </MovieCard>
  );
}

const MovieCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 450px;
    margin: 0 15px;
`;

const ImageContainer = styled.div<{ imagePath: string }>`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-repeat: no-repeat;

    ${(props) => (
    `background-image: url(${props.imagePath})`
  )}
`;

const DataContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TextContainer = styled.div`
    text-align: left;
`;

const YearContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const StyledTitle = styled.h3`
    font-size: 14px;
    color: #000000;
    text-transform: none;
`;

const StyledText = styled.p`
    font-size: 12px;
    color: #000000;
    text-transform: none;
`;
