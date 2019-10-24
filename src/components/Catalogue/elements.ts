import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px 0;

  > h1 {
    margin-left: 24px;
  }
`;

export const StockList = styled.div`
  display: flex;
  flex-wrap: wrap;

  > a {
    width: 50%;
    max-width: 250px;

    @media (min-width: 768px) {
      margin-left: 24px;
    }
  }
`;
