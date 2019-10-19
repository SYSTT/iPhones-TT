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
`;