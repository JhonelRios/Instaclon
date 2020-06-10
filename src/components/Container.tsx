import React from 'react';
import styled from 'styled-components';

interface IContainerProps {
  center?: boolean;
}

const Div = styled.div`
  background-color: #eee;
  height: 100vh;
  width: calc(100vw - 15px);
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props: IContainerProps) => (props.center ? 'center' : undefined)};
  align-items: ${(props: IContainerProps) => (props.center ? 'center' : undefined)};
`;

const Container: React.FC<IContainerProps> = (props) => {
  const { children, center = false } = props;

  return <Div center={center}>{children}</Div>;
};

export default Container;
