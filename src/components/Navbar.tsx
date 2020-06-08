import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faNewspaper } from '@fortawesome/free-solid-svg-icons';

const Div = styled.div`
  border-bottom: 1px solid #aaa;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
`;

const LinkStyled = styled(Link)`
  color: #555;
  text-decoration: none;
`

const Navbar: React.FC = () => {
  return (
    <Div>
      <LinkStyled to="/app/newsfeed">
        <FontAwesomeIcon icon={faNewspaper} /> Instaclon
      </LinkStyled>
      <LinkStyled to="/app/profile">
        <FontAwesomeIcon icon={faUser} /> Perfil
      </LinkStyled>
    </Div>
  );
};

export default Navbar;
