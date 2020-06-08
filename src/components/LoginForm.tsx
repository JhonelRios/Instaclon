import React from 'react';
import { reduxForm, InjectedFormProps, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import Input from './Input';
import Button from './Button';
import Center from './Center';
import { ILogin } from '../ducks/Users';

const LoginForm: React.FC<InjectedFormProps<ILogin>> = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="Correo"
        placeholder="Correo"
        name="email"
        type="email"
        component={Input}
      />
      <Field
        label="Contraseña"
        placeholder="Contraseña"
        name="password"
        type="password"
        component={Input}
      />
      <Button block={true}>Enviar</Button>
      <Center>
        <Link to="/register">Registrarse</Link>
      </Center>
    </form>
  );
};

export default reduxForm<ILogin>({
  form: 'login'
})(LoginForm);
