import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';

import { Colors } from './colors';

export const Heading = styled.h1`
  

  :after {
    content: '';
    width: 32px;
    height: 8px;
    margin-top: 8px;
    display: block;
    background-color: ${Colors.Red};
  }
`;

export const RoundedButton = styled(Button)`
  font-size: 18px;
  text-transform: uppercase;
  height: 40px;
  padding: 0 32px;
  font-weight: bold;
  border-radius: 16px;
`;

export const ButtonList = styled.div<{ center?: boolean }>`
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'initial'};

  > button {
    margin-right: 12px;
  }
`;

type PriceProps = { amt: number };
export const Price = ({ amt }: PriceProps) => (
  <span>${amt.toFixed(2)} TTD</span>
);
