import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { IMovieItem } from '../../types';
import defaultPicture from '../../../images/default-movie.jpg';
import { getSingleMovieRequest } from '../../actions';

export function MovieItem({
  title, genres, release_date: date, poster_path: path, id,
}: IMovieItem) {
  const year = date.split('-')[0];
  const genresData = genres.join(' & ');

  const [picture, setPicture] = useState('');
  const dispatch = useDispatch();

  const onClickHandler = useCallback(() => {
    dispatch(getSingleMovieRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    async function loadPicture() {
      const response = await fetch(path);
      if (response.ok) {
        setPicture(response.url);
      } else {
        setPicture(defaultPicture);
      }
    }
    loadPicture();
  }, [path]);

  return (
    <MovieCard>
      <ImageContainer onClick={onClickHandler}>
        <StyledImg
          src={picture}
          alt={title}
        />
      </ImageContainer>
      <DataContainer>
        <TextContainer>
          <StyledTitle>{title}</StyledTitle>
          <StyledText>{genresData}</StyledText>
        </TextContainer>
        <YearContainer>
          <StyledDate>{year}</StyledDate>
        </YearContainer>
      </DataContainer>
    </MovieCard>
  );
}

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 85%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 15%;
  padding: 5px;
`;

const TextContainer = styled.div`
  width: 80%;
  text-align: left;
`;

const YearContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 2px 5px;
`;

const StyledDate = styled.p`
  padding: 2px 5px;
  font-size: 12px;
  color: #000000;
  border: 1px solid #000000;
`;

const StyledTitle = styled.h3`
  font-size: 14px;
  color: #000000;
  text-transform: none;
`;

const StyledText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #000000;
  text-transform: none;
`;
