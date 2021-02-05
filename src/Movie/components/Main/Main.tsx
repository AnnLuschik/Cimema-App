import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { RootState } from '../../../store';
import { IMovieItem } from '../../types';
import { MovieItem } from '../MovieItem';

interface IProps {
  data: IMovieItem[]
}

const MainSection = React.forwardRef<HTMLDivElement, IProps>(({ data }: IProps, ref) => {
  const { singleMovieData } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    clearAllBodyScrollLocks();
    const target = document.querySelector('.modal');
    if (target && singleMovieData) {
      disableBodyScroll(target);
    }
  }, [singleMovieData]);

  return (
    <Container>
      {data.length
        ? (
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
        )
        : <Text>Nothing found</Text>}

    </Container>
  );
});

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Text = styled.p`
  margin-top: 40px;
  font-weight: 600;
  font-size: 26px;
  color: #000000;
`;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-row-gap: 25px;
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

export const Main = React.memo(MainSection);
