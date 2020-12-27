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
  padding: 5px 25px;
  font-size: 14px;
  color: #FFFFFF;
  text-transform: uppercase;
  background-color: #F65263;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #ec2f42;
  }
`;
