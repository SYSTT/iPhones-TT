import 'antd/dist/antd.less';
import { configure } from '@storybook/react';

configure(require.context('../src', true, /\.stories\.tsx$/), module);
