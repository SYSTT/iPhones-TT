import styled from 'styled-components';
import { Colors } from '../../utils';
import { Button } from 'antd';

export const Container = styled.div`
  padding: 24px 0;
  display: flex;
  flex-wrap: wrap;
  color: ${Colors["Grey/VeryLight"]};
  background-color: ${Colors.White};

  .ant-carousel {
    width: 100%;
    max-width: 500px;
  }

  .carousel-item {
    padding-bottom: 24px;
  }

  h4 {
    font-weight: bold;
    text-transform: uppercase;
    margin-left: 24px;
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

export const OptionList = styled.div`
  padding: 0 24px;
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
