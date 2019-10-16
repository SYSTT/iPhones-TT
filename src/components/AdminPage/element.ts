import styled from 'styled-components';
import { Colors } from '../../utils';

export const Container = styled.div`
  background-color: ${Colors.White};

  > h1 {
    margin-left: 24px;
    padding-top: 24px;
  }
  
  > p {
    margin-left: 24px;
    margin-bottom: 24px;
  }
`;
