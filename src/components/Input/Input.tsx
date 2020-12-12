import React, { useCallback } from 'react';

interface IProps {
  onChangeText: (text: string) => void
  value: string
}

export function Input({ onChangeText, value }: IProps) {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText(event.target.value);
  }, [onChangeText]);

  return <input onChange={onChange} value={value} />;
}
