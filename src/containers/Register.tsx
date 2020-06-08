import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../components/Card';
import Container from '../components/Container';
// import Input from '../components/Input';
import Button from '../components/Button';
import Title from '../components/Title';
import Center from '../components/Center';

const Register: React.FC = () => {
  return (
    <Container center>
      <Card>
        <Title>Registrarse</Title>
        {/* <Input placeholder="Correo" label="Correo" />
        <Input placeholder="Contraseña" label="Contraseña" /> */}
        <Button block={true}>Enviar</Button>
        <Center>
          <Link to="/">Iniciar sesión</Link>
        </Center>
      </Card>
    </Container>
  );
};

export default Register;
