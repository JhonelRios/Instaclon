import React from 'react';
import styled from 'styled-components';

const Span = styled.span`
  font-size: 10px;
  color: #777;
  text-transform: uppercase;
  font-weight: 900;
`;

const InputStyled = styled.input`
  background-color: #fff;
  padding: 10px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
`;

interface IInputProps {
  placeholder?: string;
  label: string;
}

const Input: React.FC<IInputProps> = (props) => {
  const { label } = props;

  return (
    <>
      <Span>{label}</Span>
      <InputStyled {...props} />
    </>
  );
};

export default Input;
