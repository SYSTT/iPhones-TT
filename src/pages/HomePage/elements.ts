import styled from 'styled-components';
import { Colors } from '../../utils';

export const Container = styled.div`
  height: 100%;
  overflow: auto;

  h1 {
    max-width: 380px;
  }

  .ant-btn {
    font-size: 18px;
    height: 40px;
    padding: 0 32px;
    font-weight: bold;
    border-radius: 16px;
  }
`;

export const Cover = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 24px 32px;

  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`;

export const Banner = styled.div`
  @media (min-width: 768px) {
    padding: 8px 40px;
  }

  h3 {
    line-height: 28px;
    margin: 16px 0;
  }
`;

export const SpotlightImage = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 24px;
`;

export const CoverLinks = styled.div`
  line-height: 56px;

  .ant-btn {
    width: 160px;
  }

  > :first-child {
    margin-right: 16px;
  }
`;

export const HighlightsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 32px 0;
  background-color: ${Colors['Grey/VeryDark']};
  color: ${Colors.White};

  > div {
    max-width: 360px;
    padding: 32px;
  }

  h2 {
    text-align: center;
    font-size: 24px;
    color: ${Colors.White};

    i {
      color: ${Colors.Red};
      font-size: 48px;
    }
  }

  p {
    font-size: 16px;
  }
`;

export const ProcessContainer = styled.div`
  padding: 48px 32px;
  max-width: 500px;
  flex: 1;
  display: flex;
  flex-direction: column;

  ol {
    padding-top: 16px;
    padding-left: 16px;
    padding-bottom: 8px;
  }

  .ant-btn {
    margin-top: auto;
    text-transform: uppercase;
  }
`;

export const ProcessSection = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const QualityContainer = styled.div`
  padding: 48px 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  > :first-child {
    margin: 24px;
  }

  > :nth-child(2) {
    max-width: 525px;
  }

  h1 {
    text-align: center;

    i {
      color: ${Colors.White};
      font-size: 32px;
      background-color: ${Colors.Red};
      padding: 8px;
      border-radius: 50%;
    }
  }
`;
