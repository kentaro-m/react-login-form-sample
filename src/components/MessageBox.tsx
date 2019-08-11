import React from 'react';
import styled from '@emotion/styled/macro';
import { Color, FontSize } from '../constants/base'

type BoxProps = {
  messages: string[],
  status: 'success' | 'failure',
}

type BoxColorProps = {
  status: 'success' | 'failure',
}

const Box = styled.div<BoxColorProps>`
  text-align: center;
  color: ${(props: BoxColorProps) => props.status === 'success' ? Color.Success : Color.Failure};
  border: 1px solid ${(props: BoxColorProps) => props.status === 'success' ? Color.Success : Color.Failure};
  padding: 10px;
  font-size: ${FontSize.Small};
  margin: 20px 0;
`;

const MessageBox: React.FC<BoxProps> = (props: BoxProps) => {
  const {messages, status} = props;

  const messagesText = messages.map((message, index) => {
    return <p key={index}>{message}</p>
  });

  return (
    <Box status={status}>
      {messagesText}
    </Box>
  )
};

export default MessageBox;