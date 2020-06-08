import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  text-align: center;
`;

const Center: React.FC = (props) => {
  return <Div {...props} />;
};

export default Center;