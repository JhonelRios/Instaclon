import React from 'react';
import styled from 'styled-components';

const A = styled.a`
  color: blue;
  font-size: 14px;
  padding: 15px;
`;

const Link: React.FC = (props) => {
  return <A {...props} />;
};

export default Link;
