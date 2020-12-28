import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { IMovieItem } from '../../types';
import { MovieItem } from '../MovieItem';

interface IProps {
  data: IMovieItem[]
}

export const Main = React.forwardRef<HTMLDivElement, IProps>(({ data }: IProps, ref) => {
  const { singleMovieData } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    if (singleMovieData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [singleMovieData]);

  return (
    <Container>
      <MoviesContainer>
        { data.map(({
          title, genres, release_date, poster_path, id,
        }) => (
          <StyledLink key={id} to={`/film/${id}`}>
            <MovieItem
              title={title}
              genres={genres}
              release_date={release_date}
              poster_path={poster_path}
            />
          </StyledLink>
        ))}
        <LoaderDiv ref={ref} />
      </MoviesContainer>
    </Container>
  );
});

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  width: 100%;
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-row-gap: 2vw;
  grid-column-gap: 5vw;
  justify-items: center;
  width: 100%;
  padding: 20px;
`;

const LoaderDiv = styled.div`
  width: 100%;
  height: 2px;
`;
