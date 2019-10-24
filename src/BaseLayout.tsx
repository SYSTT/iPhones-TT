import React from 'react';
import { Layout } from 'antd';
import Topbar from './components/Topbar';
import { Colors } from './utils';

const { Header, Content } = Layout;

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ backgroundColor: Colors.White }}>
        <Topbar />
      </Header>
      <Content style={{ overflow: 'auto', backgroundColor: Colors.White }}>
        {children}
      </Content>
    </Layout>
  );
};

export default BaseLayout;
