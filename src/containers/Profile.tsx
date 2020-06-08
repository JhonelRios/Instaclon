import React from 'react';
import styled from 'styled-components';

import ProfileImg from '../components/ProfileImg';
import Button from '../components/Button';
import Card from '../components/Card';

const Container = styled.div`
  padding: 15px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Profile: React.FC = () => {
  return (
    <Container>
      <Row>
        <ProfileImg />
        <Button>Agregar</Button>
      </Row>
      <Row>
        <Card>
          <img src="http://placekitten.com/140/140" alt="img1" />
        </Card>
        <Card>
          <img src="http://placekitten.com/140/140" alt="img2" />
        </Card>
        <Card>
          <img src="http://placekitten.com/140/140" alt="img3" />
        </Card>
      </Row>
    </Container>
  );
};

export default Profile;
