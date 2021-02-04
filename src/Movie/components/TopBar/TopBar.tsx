import React from 'react';
import styled from 'styled-components';
import { SortByType, SortOrderType } from '../../types';

interface IProps {
  total: number
  onClickTitle: () => void
  onClickDate: () => void
  onClickRating: () => void
  currentSort: SortByType
  currentOrder: SortOrderType
}

export const TopBar = React.memo(({
  total, onClickTitle, onClickDate, onClickRating, currentSort, currentOrder,
}: IProps) => (
  <Container>
    <div>
      <Text>{total === 1 ? `${total} movie found` : `${total} movies found`}</Text>
    </div>
    <SortPanel>
      <StyledText>Sort by</StyledText>
      <StyledButton onClick={onClickTitle} id="title" current={currentSort} order={currentOrder}>
        {currentSort === 'title' ? <ArrowSpan>{String.fromCharCode(currentOrder === 'asc' ? 8593 : 8595)}</ArrowSpan> : null}
        title
      </StyledButton>
      <StyledButton onClick={onClickDate} id="release_date" current={currentSort} order={currentOrder}>
        {currentSort === 'release_date' ? <ArrowSpan>{String.fromCharCode(currentOrder === 'asc' ? 8593 : 8595)}</ArrowSpan> : null}
        release date
      </StyledButton>
      <StyledButton onClick={onClickRating} id="vote_average" current={currentSort} order={currentOrder}>
        {currentSort === 'vote_average' ? <ArrowSpan>{String.fromCharCode(currentOrder === 'asc' ? 8593 : 8595)}</ArrowSpan> : null}
        rating
      </StyledButton>
    </SortPanel>
  </Container>
));

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 50px;
  padding: 10px 20px;
  background-color: #F5F4F5;

  @media (max-width: 375px) {
    min-height: 75px;
    flex-direction: column;
  }
`;

const SortPanel = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;

  &::after {
    content: '';
    position: absolute;
    display: none;
    top: 0;
    width: 100%;
    height: 1px;
    border: none;
    border-top: 1px solid #000000;

    @media (max-width: 375px) {
    display: block;
  }
  }
`;

const Text = styled.p`
  margin: 0 10px 5px 0;
  font-weight: 600;
  font-size: 16px;
  color: #565556;
  text-transform: none;
`;

const StyledText = styled(Text)`
  @media (max-width: 425px) {
    display: none;
  }
`;

const StyledButton = styled.button<{ current: SortByType, order: SortOrderType }>`
  position: relative;
  min-width: 75px;
  padding: 2px 5px;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    opacity: 0.8;
  }

  ${(props) => (props.current === props.id
    ? 'color: #F65263'
    : 'color: #565556'
  )}
`;

const ArrowSpan = styled.span`
  font-size: 20px;
`;
