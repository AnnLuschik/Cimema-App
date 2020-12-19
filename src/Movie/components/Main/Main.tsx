import React from 'react';
import styled from 'styled-components';
import { MoviesList } from '../../types';
import { MovieItem } from '../MovieItem';

export function Main({ data, total }: MoviesList) {
  return (
    <Container>
      <Topbar>
        <div>
          <Text>
            {total}
            {' '}
            movies found
          </Text>
        </div>
        <SortPanel>
          <Text>Sort by</Text>
          <StyledButton>release date</StyledButton>
          <StyledButton>rating</StyledButton>
        </SortPanel>
      </Topbar>
      <MoviesContainer>
        { data.map(({
          title, genres, release_date, poster_path, id,
        }) => (
          <MovieItem
            title={title}
            genres={genres}
            release_date={release_date}
            poster_path={poster_path}
            key={id}
          />
        ))}
      </MoviesContainer>
    </Container>
  );
}

const Container = styled.div`
    width: 100%;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 50px;
  background-color: #F5F4F5;
`;

const SortPanel = styled.div`
    display: flex;
    align-items: baseline;
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-row-gap: 2vw;
  grid-column-gap: 5vw;
  justify-items: center;
  width: 100%;
  padding: 15px 20px;
`;

const StyledButton = styled.button`
    min-width: 75px;
    padding: 2px 5px;
    font-weight: 600;
    font-size: 16px;
    color: #565556;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
`;

const Text = styled.p`
    font-weight: 600;
    font-size: 16px;
    color: #565556;
    text-transform: none;
`;
