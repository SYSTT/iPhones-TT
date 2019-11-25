import styled from 'styled-components';

export const Container = styled.div`
  .ant-steps {
    display: flex !important;
  }

  .ant-steps-item-tail::after {
    content: none;
  }

  .ant-steps-horizontal.ant-steps-label-horizontal .ant-steps-item-content {
    min-height: unset !important;
  }

  .ant-steps-navigation .ant-steps-item {
    text-align: left;

    @media (min-width: 768px) {
      text-align: center;
    }
  }

  .ant-steps-navigation.ant-steps-small .ant-steps-item-container {
    margin-left: 8px;

    @media (min-width: 768px) {
      margin-left: -12px;
    }
  }

  .ant-steps-item:last-child {
    min-width: 130px;
  }
`;
