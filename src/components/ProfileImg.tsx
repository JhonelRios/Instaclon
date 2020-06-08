import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  border-radius: 100%
`;

const ProfileImg: React.FC = () => {
  return (
    <Img src="http://placekitten.com/100/100" alt="profile" />
  );
};

export default ProfileImg;
