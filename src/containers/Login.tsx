import React from 'react';
import { connect } from 'react-redux';

import Card from '../components/Card';
import Container from '../components/Container';
import Title from '../components/Title';
import LoginForm from '../components/LoginForm';

import { login, ILogin } from '../ducks/Users';
import { IState } from '../ducks';

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

const mapStateToProps = (state: IState) => {
  return state;
};

const mapDispatchToProps = {
  login
}

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>) => {
//   return {
//     login: (payload: any) => dispatch(loginThunk(payload))
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
