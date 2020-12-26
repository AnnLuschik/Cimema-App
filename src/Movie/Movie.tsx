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
  const [value, setValue] = useState('');
  const [searchByValue, setSearchByValue] = useState<SearchByType>('title');
  const [sortByValue, setSortByValue] = useState<SortByType>('title');
  const [sortOrderValue, setSortOrderValue] = useState<SortOrderType>('asc');

  const {
    responseData,
    loading,
    errorMessage,
    searchParams: {
      searchValue: currentSearchValue,
      searchBy: currentSearchBy,
      sortBy: currentSortBy,
    },
  } = useSelector((state: RootState) => state.movie);

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
      sortBy: sortByValue,
      sortOrder: sortOrderValue,
    }));
    setValue('');
    setSortByValue('title');
    setSortOrderValue('asc');
  }, [dispatch, value, searchByValue, sortByValue, sortOrderValue]);

  const onClickDateBtn = useCallback(() => {
    setSortByValue('release_date');
    if (currentSortBy !== 'release_date') {
      setSortOrderValue('desc');
    } else if (sortOrderValue === 'asc') {
      setSortOrderValue('desc');
    } else {
      setSortOrderValue('asc');
    }
  }, [sortOrderValue, currentSortBy]);

  const onClickRatingBtn = useCallback(() => {
    setSortByValue('vote_average');
    if (currentSortBy !== 'vote_average') {
      setSortOrderValue('desc');
    } else if (sortOrderValue === 'asc') {
      setSortOrderValue('desc');
    } else {
      setSortOrderValue('asc');
    }
  }, [sortOrderValue, currentSortBy]);

  useEffect(() => {
    if (sortByValue !== 'title') {
      dispatch(getMoviesRequest({
        searchValue: currentSearchValue,
        searchBy: currentSearchBy,
        sortBy: sortByValue,
        sortOrder: sortOrderValue,
      }));
    }
  }, [dispatch, sortByValue, currentSearchValue, currentSearchBy, sortOrderValue]);

  const loader = useRef<HTMLDivElement>(null);

  return (
    <div style={{ width: '1366px', margin: '0 auto' }}>
      <StyledHeader image={headerBcg}>
        <Fogging>
          <StyledForm onSubmit={(e) => e.preventDefault()}>
            <StyledTitle>find your movie</StyledTitle>
            <Input value={value} onChange={(e) => setValue(e)} />
            <Container>
              <CheckboxContainer>
                <p style={{ marginRight: '5px', color: '#FFFFFF', textTransform: 'uppercase' }}>search by</p>
                <RadioInput id="title" value="title" currentSearch={searchByValue} onChange={() => setSearchByValue('title')} />
                <RadioInput id="genres" value="genre" currentSearch={searchByValue} onChange={() => setSearchByValue('genres')} />
              </CheckboxContainer>
              <Button onClick={onClickSearchButton}>search</Button>
            </Container>
          </StyledForm>
        </Fogging>
      </StyledHeader>
      { loading ? <BarLoader color="#F65263" width="100%" /> : null }
      { errorMessage ? <p style={{ color: '#b40719' }}>{errorMessage}</p> : null }
      { responseData ? (
        <TopBar
          total={responseData.total}
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
  padding-top: 15px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
