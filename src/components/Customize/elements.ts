import styled from 'styled-components';
import { Colors } from '../../utils';

export const Container = styled.div`
  padding: 24px 0;
  display: flex;
  flex-wrap: wrap;
  color: ${Colors['Grey/VeryLight']};

  .ant-carousel {
    width: 100%;
    max-width: 500px;
  }

  .carousel-item {
    padding-bottom: 24px;
  }
`;

export const Content = styled.div`
  flex: 1;

  @media (min-width: 1024px) {
    padding: 0 48px;
  }

  > h1 {
    margin-left: 24px;
  }
`;

export const SelectorContainer = styled.div`
  padding: 0 24px;

  h4 {
    font-weight: bold;
    text-transform: uppercase;
  }
`;
