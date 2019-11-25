import styled, { css } from 'styled-components';
import { Colors } from '../../utils';

export const Container = styled.span<{ block?: boolean }>`
  ${props =>
    props.block &&
    css`
      > span {
        display: block;
      }
    `}
`;

export const Reduction = styled.span`
  color: ${Colors.Green};
  margin-right: 4px;
`;

export const BasePrice = styled.span<{ reduced?: boolean }>`
  position: relative;
  text-decoration: ${props => (props.reduced ? 'line-through' : 'initial')};
`;
