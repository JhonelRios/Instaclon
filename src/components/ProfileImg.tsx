import React from 'react';
import styled from 'styled-components';
import { reduxForm, InjectedFormProps, Field, WrappedFieldProps } from 'redux-form';

interface IProfileImgProps {
  submit: () => void;
  image: string;
}

const Input = styled.input`
  display: none;
`;

const Img = styled.img`
  border-radius: 100%;
  width: 100px;
  height: 100px;
`;

const RenderField: React.FC<WrappedFieldProps & IProfileImgProps> = (props) => {
  const { input, submit, image } = props;

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
        <Img src={image} alt="profile" />
      </label>
    </>
  );
};

const ProfileImg: React.FC<
  InjectedFormProps<{ profileImg: File }, IProfileImgProps> & IProfileImgProps
> = (props) => {
  const { handleSubmit, submit, image } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field image={image} name="profileImg" component={RenderField} submit={submit} />
    </form>
  );
};

export default reduxForm<{ profileImg: File }, IProfileImgProps>({
  form: 'profileImg'
})(ProfileImg);
