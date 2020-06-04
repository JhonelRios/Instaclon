import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  background-color: #eee;
  height: 100vh;
  width: 100vw;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container: React.FC = (props) => {
  const { children } = props;

  return <Div>{children}</Div>;
};

export default Container;
