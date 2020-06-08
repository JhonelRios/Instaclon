import React from 'react';
import styled from 'styled-components';

import PostInfo from './PostInfo';

interface IPostProps {
  src: string;
}

const Div = styled.div`
  background-color: #fff;
  padding: 10px 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

const Post: React.FC<IPostProps> = (props) => {
  const { src } = props;

  return (
    <Div>
      <img src={src} alt="gatito" />
      <PostInfo />
    </Div>
  );
};

export default Post;
