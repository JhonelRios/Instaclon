import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faRetweet } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  background-color: #eee;
  width: calc(100% + 30px);
  margin-left: -15px;
  margin-bottom: -10px;
  display: flex;
`;

const Button = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px 15px;
  cursor: pointer;
`;

const PostInfo: React.FC = () => {
  return (
    <Wrapper>
      <Button>
        <FontAwesomeIcon icon={faThumbsUp} /> Like
      </Button>
      <Button>
        <FontAwesomeIcon icon={faRetweet} /> Compartir
      </Button>
    </Wrapper>
  );
};

export default PostInfo;
