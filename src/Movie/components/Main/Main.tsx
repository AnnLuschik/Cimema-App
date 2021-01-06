import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { disableBodyScroll } from 'body-scroll-lock';
import { RootState } from '../../../store';
import { IMovieItem } from '../../types';
import { MovieItem } from '../MovieItem';

interface IProps {
  data: IMovieItem[]
}

export const Main = React.forwardRef<HTMLDivElement, IProps>(({ data }: IProps, ref) => {
  const { singleMovieData } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    const target = document.querySelector('.modal');
    if (singleMovieData && target) {
      disableBodyScroll(target);
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-row-gap: 10px;
  grid-column-gap: 1.5vw;
  justify-items: center;
  width: 100%;
  padding: 20px;
  @media (max-width: 425px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
`;

const LoaderDiv = styled.div`
  width: 100%;
  height: 2px;
`;
