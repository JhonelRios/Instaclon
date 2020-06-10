import React from 'react';
import styled from 'styled-components';

import PostInfo from './PostInfo';

interface IPostProps {
  src: string;
  like: () => void;
  share: () => void;
}

const Div = styled.div`
  background-color: #fff;
  padding: 10px 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;

  & img {
    width: 300px;
  }
`;

const Post: React.FC<IPostProps> = (props) => {
  const { src, like, share } = props;

  return (
    <Div>
      <img src={src} alt="gatito" />
      <PostInfo like={like} share={share} />
    </Div>
  );
};

export default Post;
