import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Container from '../components/Container';
import Post from '../components/Post';
import { IDataPosts, fetchPosts, like, share } from '../ducks/Posts';

interface INewsFeedProps {
  fetchPosts: () => void;
  like: (a: string) => void;
  share: (a: string) => void;
  fetched: boolean;
  loading: boolean;
  data: IDataPosts;
}

const Div = styled.div`
  margin: 0 auto;
`;

const NewsFeed: React.FC<INewsFeedProps> = (props) => {
  const { fetchPosts, fetched, data } = props;

  useEffect(() => {
    fetchPosts();
  }, [fetched]);

  const handleLike = (id: string) => () => {
    const { like } = props;
    like(id);
  };

  const handleShare = (id: string) => () => {
    const { share } = props;
    share(id);
  };

  return (
    <Container>
      {Object.keys(data).map((id) => {
        const post = data[id];

        return (
          <Div key={id}>
            <Post like={handleLike(id)} share={handleShare(id)} src={post.imageURL} />
          </Div>
        );
      })}
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  const {
    Posts: { data, fetching, fetched }
  } = state;
  const loading = fetching || !fetched;

  return {
    loading,
    fetched,
    data
  };
};

const mapDispatchToProps = {
  fetchPosts,
  like,
  share
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);
