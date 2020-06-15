import React, { useEffect } from 'react';
import { chunk } from 'lodash';
import { submit, FormAction } from 'redux-form';
import styled from 'styled-components';

import ProfileImg from '../components/ProfileImg';
import Button from '../components/Button';
import Card from '../components/Card';
import { connect } from 'react-redux';
import { IPost, fetchPosts } from '../ducks/Posts';
import { handleProfileImgSubmit } from '../ducks/Users';
import services from '../services';
import { IState } from '../ducks';

const { auth } = services;

interface IProfileProps {
  fetchPosts: () => void;
  submit: (a: string) => FormAction;
  handleProfileImgSubmit: (a: { profileImg: File }) => void;
  fetched: boolean;
  loading: boolean;
  data: IPost[][];
  profileImg: string;
}

const Container = styled.div`
  padding: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 200px;
`;

const Profile: React.FC<IProfileProps> = (props) => {
  const { fetchPosts, fetched, data, submit, handleProfileImgSubmit, profileImg } = props;

  useEffect(() => {
    fetchPosts();
  }, [fetched]);

  return (
    <Container>
      <Row>
        <ProfileImg
          image={profileImg}
          onSubmit={handleProfileImgSubmit}
          submit={() => submit('profileImg')}
        />
        <Button>Agregar</Button>
      </Row>
      {data.map((row, i) => (
        <Row key={i}>
          {row.map((post) => (
            <Card key={post.imageURL}>
              <Img src={post.imageURL} alt={post.comment} />
            </Card>
          ))}
        </Row>
      ))}
    </Container>
  );
};

const mapStateToProps = (state: IState) => {
  const {
    Posts: { data, fetching, fetched }
  } = state;
  const {
    Users: { profileImage: tempPI }
  } = state;

  const loading = fetching || !fetched;
  const profileImg = tempPI || 'http://placekitten.com/100/100';

  const filtered = Object.keys(data).reduce((acc, el) => {
    if (data[el].userId !== auth.currentUser?.uid) {
      return acc;
    }

    return acc.concat(data[el]);
  }, [] as IPost[]);

  return {
    data: chunk(filtered, 3),
    loading,
    fetched,
    profileImg
  };
};

const mapDispatchToProps = {
  fetchPosts,
  submit,
  handleProfileImgSubmit
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
