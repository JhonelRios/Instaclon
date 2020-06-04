import React from 'react';
import styled from 'styled-components';

const H2 = styled.h2`
  color: #555;
`

const Title: React.FC = (props) => {
  return <H2 {...props} />;
};

export default Title;
