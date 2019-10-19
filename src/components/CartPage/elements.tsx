import styled from 'styled-components';
import { Colors } from '../../utils';

export const Container = styled.div`
  padding: 24px;
`;

export const ItemContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }

  > img {
    margin: 0 auto;
    padding: 24px;
    max-width: 225px;
    display: block;
  }
`;

export const ItemContent = styled.div`
  flex: 1;
`;

export const ItemDetails = styled.div`
  white-space: nowrap;
  display: flex;
  flex-wrap: wrap;

  > h2 {
    flex: 3;
  
    > a {
      color: ${Colors.Black};
      line-height: 30px;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        color: ${Colors.Primary};
      }
    }
  }

  .ant-select-selection {
    border: none;
  }
  .ant-select-selection--single .ant-select-selection__rendered {
    margin-right: 32px;
    line-height: 
  }
  .ant-select-arrow {
    color: ${Colors.Primary};
  }

  @media (min-width: 768px) {
    > div {
      flex: 1;
    }
  }
`;

export const ItemPrice = styled.div`
  text-align: end;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  .ant-btn {
    padding: 0;
    border: none;
  }

  @media (min-width: 768px) {
    width: unset;
    display: block;
  }
`;

export const CartDetails = styled.div`
  margin-top: 24px;
  text-align: end;

  > div {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
  }
`;
