import React from 'react';
import styled from 'styled-components';

import Container from '../components/Container';
import Post from '../components/Post';

const Div = styled.div`
  margin: 0 auto;
`;

const NewsFeed = () => {
  return (
    <Container>
      <Div>
        <Post src="http://placekitten.com/300/200" />
        <Post src="http://placekitten.com/300/200" />
      </Div>
    </Container>
  );
};

export default NewsFeed;
