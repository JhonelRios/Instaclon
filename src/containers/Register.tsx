import React from 'react';
import { connect } from 'react-redux';

import Card from '../components/Card';
import Container from '../components/Container';
import Title from '../components/Title';
import RegisterForm from '../components/RegisterForm';

import { register, ILogin } from '../ducks/Users';
import { IState } from '../ducks';

interface IRegisterProps {
  register: (a: ILogin) => void;
}

const Register: React.FC<IRegisterProps> = (props) => {
  const { register } = props;

  return (
    <Container center>
      <Card>
        <Title>Registrarse</Title>
        <RegisterForm onSubmit={register} />
      </Card>
    </Container>
  );
};

const mapStateToProps = (state: IState) => {
  return state;
};

const mapDispatchToProps = {
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
