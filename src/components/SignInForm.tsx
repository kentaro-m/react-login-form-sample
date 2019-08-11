import React, {useCallback, useEffect, useState} from 'react';
import styled from '@emotion/styled/macro';
import * as yup from 'yup';
import { FontSize } from '../constants/base';
import MessageBox from './MessageBox';
import { authenticate } from '../service/user';

const Form = styled.form`
  font-family: Noto Sans JP;
  width: 300px;
  background: #fff;
  padding: 40px;
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

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [messages, setMessages] = useState<string[]|null>(null);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const onChangeField = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (event.target.name) {
        case 'email':
          setEmail(event.target.value);
          break;
        case 'password':
          setPassword(event.target.value);
          break;
      }
    },
    [],
  );

  const validate = async (values: {[key: string]: string}): Promise<void> => {
    const signInScheme = yup.object().shape({
      email: yup
        .string()
        .email('Email must be a valid.')
        .required('Email must not be a empty.'),
      password: yup
        .string()
        .min(8, 'Password must be at least 8 characters.')
        .matches(/^[A-Za-z0-9●!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/, 'Password must be a valid.')
        .required('Password must not be a empty.')
    });

    try {
      await signInScheme.validate(values, { abortEarly: false });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      if (canSubmit) {
        setMessages(null);
        try {
          await authenticate(email, password);
          setEmail('');
          setPassword('');
          setMessages(['Sign In Successfully.']);
          setCanSubmit(false);
          setHasError(false);
        } catch (error) {
          setMessages([error.message]);
          setCanSubmit(false);
          setHasError(true);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canSubmit]);

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const formValues = {
        email,
        password,
      };

      try {
        await validate(formValues);
        setCanSubmit(true);
        setHasError(false);
      } catch (error) {
        setMessages(error.errors);
        setCanSubmit(false);
        setHasError(true);
      }
    },
    [email, password],
  );

  return (
    <Form
      onSubmit={onSubmit}
    >
      <Field
        name='email'
        placeholder='Email'
        type='email'
        value={email}
        onChange={onChangeField}
      />
      <Field
        name='password'
        placeholder='Password'
        type='password'
        value={password}
        onChange={onChangeField}
      />
      {messages &&
        <MessageBox
          messages={messages}
          status={hasError ? 'failure' : 'success'}
        />}
      <SignInButton>
        SIGN IN
      </SignInButton>
    </Form>
  )
};

export default SignInForm;