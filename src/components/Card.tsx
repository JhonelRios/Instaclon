import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  background-color: #fff;
  padding: 10px 15px;
  border: 1px solid #eee;
`;

const Card: React.FC = (props) => {
  const { children } = props;

  return <Div>{children}</Div>;
};

export default Card;
