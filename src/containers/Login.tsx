import React from 'react';
import { connect } from 'react-redux';

import Card from '../components/Card';
import Container from '../components/Container';
import Title from '../components/Title';
import LoginForm from '../components/LoginForm';

import { login as loginThunk, ILogin } from '../ducks/Users';
import { ThunkDispatch } from 'redux-thunk';

interface ILoginProps {
  login: (a: ILogin) => void;
}

const Login: React.FC<ILoginProps> = (props) => {
  const { login } = props;

  return (
    <Container center>
      <Card>
        <Title>Iniciar sesión</Title>
        <LoginForm onSubmit={login} />
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: any) => {
  return state;
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
  return {
    login: (payload: any) => dispatch(loginThunk(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
