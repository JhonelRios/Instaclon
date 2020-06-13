import React from 'react';
import styled from 'styled-components';
import { reduxForm, InjectedFormProps, Field, WrappedFieldProps } from 'redux-form';

interface IProfileImgProps {
  submit: () => void;
}

const Input = styled.input`
  display: none;
`;

const Img = styled.img`
  border-radius: 100%;
`;

const RenderField: React.FC<WrappedFieldProps & IProfileImgProps> = (props) => {
  const { input, submit } = props;

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { onChange } = input;
    const { files } = event.target;

    if (files) {
      await onChange(files[0]);
      submit();
    }
  };

  return (
    <>
      <Input onChange={handleChange} type="file" id="profileImage" />
      <label htmlFor="profileImage">
        <Img src="http://placekitten.com/100/100" alt="profile" />
      </label>
    </>
  );
};

const ProfileImg: React.FC<InjectedFormProps<{ file: File }, IProfileImgProps> & IProfileImgProps> = (props) => {
  const { handleSubmit, submit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field name="profileImg" component={RenderField} submit={submit} />
    </form>
  );
};

export default reduxForm<{ file: File }, IProfileImgProps>({
  form: 'profileImg'
})(ProfileImg);
