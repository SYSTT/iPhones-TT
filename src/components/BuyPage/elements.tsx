import styled from 'styled-components';
import { Colors } from '../../utils';

export const Container = styled.div`
  background-color: ${Colors.White};

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