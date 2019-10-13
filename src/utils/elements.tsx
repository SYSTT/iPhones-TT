import styled from 'styled-components';
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