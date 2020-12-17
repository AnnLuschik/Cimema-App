import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import styled from 'styled-components';
import {
  Input, Button, RadioInput, MovieItem,
} from './components';
import { getMoviesRequest } from './Movie';
import { RootState } from './store';

export function App() {
  const [value, setValue] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const { data } = useSelector((state: RootState) => state.movie);

  const dispatch = useDispatch();

  const onClickButton = useCallback(() => {
    dispatch(getMoviesRequest({ searchValue: value, searchType: searchBy }));
    setValue('');
  }, [dispatch, value, searchBy]);

  return (
    <div className="App">
      <div className="header">
        <StyledForm onSubmit={(e) => e.preventDefault()}>
          <h3>find your movie</h3>
          <Input value={value} onChange={(e) => setValue(e)} />
          <Container>
            <CheckboxContainer>
              <p>search by</p>
              <RadioInput id="title" value="title" currentSearch={searchBy} onChange={() => setSearchBy('title')} />
              <RadioInput id="genres" value="genre" currentSearch={searchBy} onChange={() => setSearchBy('genres')} />
            </CheckboxContainer>
            <Button onClick={onClickButton}>search</Button>
          </Container>
        </StyledForm>
      </div>
      <MoviesContainer>
        {
          data ? data.data.map(({
            title, genres, release_date, poster_path,
          }) => (
            <MovieItem
              title={title}
              genres={genres}
              release_date={release_date}
              poster_path={poster_path}
            />
          ))
            : null
        }
      </MoviesContainer>
    </div>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  height: 300px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 35%;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 15px 20px;
`;
