import React from 'react';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  color: #fff;
  background-color: #00d1b2;
  border: 0;
  padding: 10px 15px;
  border-radius: 4px;
`;

const Button: React.FC = (props) => {
  return <ButtonStyled {...props} />;
};

export default Button;
