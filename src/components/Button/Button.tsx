import React from 'react';
import styled from 'styled-components';

interface IProps {
  children: string
  onClick: () => void
}

export function Button({ children, onClick, ...restProps }: IProps) {
  return <StyledButton onClick={onClick} {...restProps}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  padding: 5px 15px;
  color: #FFFFFF;
  text-transform: uppercase;
  background-color: #F6F5F6;
`;
