import React from 'react';
import styled from 'styled-components';

interface IButtonProps {
  block?: boolean;
}

const ButtonStyled = styled.button`
  color: #fff;
  background-color: #00d1b2;
  border: 0;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  width: ${(props: IButtonProps) => (props.block ? '100%' : undefined)};
`;

const Button: React.FC<IButtonProps> = (props) => {
  return <ButtonStyled {...props} />;
};

export default Button;
