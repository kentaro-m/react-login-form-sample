import React from 'react';
import './App.css';
import SignInForm from './components/SignInForm';
import styled from '@emotion/styled/macro';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 650px;
`;

const App: React.FC = () => {
  return (
    <Container>
      <SignInForm/>
    </Container>
  );
}

export default App;
