import React, { useCallback } from 'react';
import styled from 'styled-components';

interface IProps {
  onChange: (text: string) => void
  value: string
}

export const Input = React.memo(({ onChange, value }: IProps) => {
  const onChangeText = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);

  return <StyledInput onChange={onChangeText} value={value} />;
});

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 14px;
  color: #FFFFFF;
  background-color: #000000;
  border: 1px solid #000000;
  border-bottom: 2px solid #F65263;
  outline: none;
  opacity: 0.9;
`;
