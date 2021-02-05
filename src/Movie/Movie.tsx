import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BarLoader from 'react-spinners/BarLoader';
import { Input, Button, RadioInput } from '../components';
import { Main, TopBar } from './components';
import { getMoviesRequest, getMoreMoviesRequest } from './actions';
import { SearchByType, SortByType, SortOrderType } from './types';
import { RootState } from '../store';
import headerBcg from '../images/header.jpg';

export const Movie: React.FunctionComponent = () => {
  const {
    responseData,
    loading,
    errorMessage,
    searchParams: {
      searchBy: currentSearchBy,
      sortBy: currentSortBy,
      sortOrder: currentSortOrder,
    },
  } = useSelector((state: RootState) => state.movie);

  const [value, setValue] = useState('');
  const [searchByValue, setSearchByValue] = useState<SearchByType>(currentSearchBy);
  const [sortByValue, setSortByValue] = useState<SortByType>(currentSortBy);
  const [sortOrderValue, setSortOrderValue] = useState<SortOrderType>(currentSortOrder);

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '',
      threshold: 0.5,
    };

    const handleObserver:IntersectionObserverCallback = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        dispatch(getMoreMoviesRequest());
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (responseData) {
      const { total } = responseData;

      if (responseData.data.length < total && loader.current) {
        observer.observe(loader.current);
      }
    }
    return () => observer.disconnect();
  }, [responseData, dispatch]);

  const onClickSearchButton = useCallback(() => {
    dispatch(getMoviesRequest({
      searchValue: value,
      searchBy: searchByValue,
      sortBy: 'release_date',
      sortOrder: 'desc',
    }));
    setSortByValue('release_date');
    setSortOrderValue('desc');
  }, [dispatch, value, searchByValue]);

  const onClickTitleBtn = useCallback(() => {
    setSortByValue('title');
    setSortOrderValue(sortOrderValue === 'asc' ? 'desc' : 'asc');
    dispatch(getMoviesRequest({
      searchValue: value,
      searchBy: searchByValue,
      sortBy: 'title',
      sortOrder: sortOrderValue === 'asc' ? 'desc' : 'asc',
    }));
  }, [dispatch, sortOrderValue, searchByValue, value]);

  const onClickDateBtn = useCallback(() => {
    setSortByValue('release_date');
    setSortOrderValue(sortOrderValue === 'asc' ? 'desc' : 'asc');
    dispatch(getMoviesRequest({
      searchValue: value,
      searchBy: searchByValue,
      sortBy: 'release_date',
      sortOrder: sortOrderValue === 'asc' ? 'desc' : 'asc',
    }));
  }, [dispatch, sortOrderValue, searchByValue, value]);

  const onClickRatingBtn = useCallback(() => {
    setSortByValue('vote_average');
    setSortOrderValue(sortOrderValue === 'asc' ? 'desc' : 'asc');
    dispatch(getMoviesRequest({
      searchValue: value,
      searchBy: searchByValue,
      sortBy: 'vote_average',
      sortOrder: sortOrderValue === 'asc' ? 'desc' : 'asc',
    }));
  }, [dispatch, sortOrderValue, searchByValue, value]);

  useEffect(() => {
    if (!responseData) {
      dispatch(getMoviesRequest({
        searchValue: value,
        searchBy: searchByValue,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      }));
    }
  }, [dispatch, responseData, searchByValue, value, sortByValue, sortOrderValue]);

  const loader = useRef<HTMLDivElement>(null);

  return (
    <div style={{ maxWidth: '1366px', margin: '0 auto' }}>
      <StyledHeader image={headerBcg}>
        <Fogging>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <StyledTitle>find your movie</StyledTitle>
            <Input value={value} onChange={(e) => setValue(e)} />
            <Container>
              <CheckboxContainer>
                <StyledSearchBy>search by</StyledSearchBy>
                <RadioInput id="title" value="title" currentSearch={searchByValue} onChange={() => setSearchByValue('title')} />
                <RadioInput id="genres" value="genre" currentSearch={searchByValue} onChange={() => setSearchByValue('genres')} />
              </CheckboxContainer>
              <Button onClick={onClickSearchButton}>search</Button>
            </Container>
          </StyledForm>
        </Fogging>
      </StyledHeader>
      { loading ? <BarLoader color="#F65263" width="100%" height="5px" /> : <div style={{ width: '100%', height: '5px' }} /> }
      { errorMessage ? <p style={{ color: '#b40719' }}>{errorMessage}</p> : null }
      { responseData ? (
        <TopBar
          total={responseData.total}
          onClickTitle={onClickTitleBtn}
          onClickDate={onClickDateBtn}
          onClickRating={onClickRatingBtn}
          currentSort={sortByValue}
          currentOrder={sortOrderValue}
        />
      )
        : null}
      { responseData ? <Main data={responseData.data} ref={loader} />
        : null }
    </div>
  );
};

const StyledHeader = styled.div<{image: string}>`
  width: 100%;
  height: 300px;
  ${(props) => `background: url(${props.image}) center no-repeat;`}
  background-size: cover;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 300px;
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 320px) {
    width: 95%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 15px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 25px;
  }
  @media (max-width: 425px) {
    justify-content: space-between;
  }
`;

const StyledSearchBy = styled.p`
  margin-right: 5px;
  color: #FFFFFF;
  text-transform: uppercase;
  text-align: center;
`;

const Fogging = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  background: rgba(0,0,0,0.6);
`;

const StyledTitle = styled.h3`
  font-weight: 600;
  font-size: 30px;
  color: #FFFFFF;
  text-transform: uppercase;
`;
