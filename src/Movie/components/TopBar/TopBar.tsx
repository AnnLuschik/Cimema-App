import React from 'react';
import styled from 'styled-components';
import { SortByType, SortOrderType } from '../../types';

interface IProps {
  total: number
  onClickDate: () => void
  onClickRating: () => void
  currentSort: SortByType
  currentOrder: SortOrderType
}

export function TopBar({
  total, onClickDate, onClickRating, currentSort, currentOrder,
}: IProps) {
  return (
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
        <StyledButton onClick={onClickDate} id="release_date" current={currentSort} order={currentOrder}>
          {currentSort === 'release_date' ? <ArrowSpan>{String.fromCharCode(currentOrder === 'asc' ? 8593 : 8595)}</ArrowSpan> : null}
          release date
        </StyledButton>
        <StyledButton onClick={onClickRating} id="vote_average" current={currentSort} order={currentOrder}>
          {currentSort === 'vote_average' ? <ArrowSpan>{String.fromCharCode(currentOrder === 'asc' ? 8593 : 8595)}</ArrowSpan> : null}
          rating
        </StyledButton>
      </SortPanel>
    </Topbar>
  );
}

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

const StyledButton = styled.button<{ current: SortByType, order: SortOrderType }>`
  position: relative;
  min-width: 75px;
  padding: 2px 5px;
  font-weight: 600;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;

  ${(props) => (props.current === props.id
    ? 'color: #F65263'
    : 'color: #565556'
  )}
`;

const Text = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #565556;
  text-transform: none;
`;

const ArrowSpan = styled.span`
  font-size: 20px;
`;
