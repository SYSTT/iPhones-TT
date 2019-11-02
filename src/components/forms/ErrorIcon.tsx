import React from 'react';
import { Tooltip, Icon } from 'antd';
import { Colors } from '../../utils';

interface Props {
  error: string;
}

const ErrorIcon = ({ error }: Props) => {
  return (
    <Tooltip title={error}>
      <Icon
        type="exclamation-circle"
        style={{ color: Colors.Red, marginInlineEnd: 8 }}
        data-testid="ErrorIcon"
      />
    </Tooltip>
  );
};

export default ErrorIcon;
