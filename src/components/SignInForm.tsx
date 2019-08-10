import React from 'react';
import styled from '@emotion/styled/macro';

enum Color {
  Success = '#7BB49F'
}

enum FontSize {
  Regular = '15px'
}

const Form = styled.form`
  font-family: Noto Sans JP;
  width: 25%;
`;

const Field = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  font-size: ${FontSize.Regular};
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const SignInButton = styled.button`
  background: #333;
  color: #fff;
  font-size: ${FontSize.Regular};
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: bold;
`;

const MessageBox = styled.div`
  text-align: center;
  color: ${Color.Success};
  border: 1px solid ${Color.Success};
  padding: 10px;
  font-size: ${FontSize.Regular};
  margin: 20px 0;
`;

const SignInForm: React.FC = () => {
  return (
    <Form>
      <Field
        placeholder='Email'
        type='email'
      />
      <Field
        placeholder='Password'
        type='password'
      />
      <MessageBox>
        Sign In Successfully
      </MessageBox>
      <SignInButton>
        SIGN IN
      </SignInButton>
    </Form>
  )
};

export default SignInForm;