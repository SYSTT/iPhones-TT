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

export const OptionList = styled.div`
  padding-bottom: 16px;

  h2 {
    color: inherit;
    margin: 0;
  }
`;

export const OptionButton = styled(Button)<{ selected?: boolean }>`
  color: ${Colors.Black};
  text-align: start;
  margin-right: 16px;
  margin-bottom: 16px;
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-color: ${props => props.selected ? Colors.Primary : Colors["Grey/VeryLight"]};
  border-width: ${props => props.selected ? '2px' : '1px'};

  &:focus, &:hover {
    color: ${Colors.Black};
    border-color: ${props => props.selected ? Colors.Primary : Colors.Grey};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${Colors["Red/VeryLight"]};
    border-color: ${Colors.Primary};
  }
`;

type PriceProps = { amt: number };
export const Price = ({ amt }: PriceProps) => (
  <span>${amt.toFixed(2)} TTD</span>
);
