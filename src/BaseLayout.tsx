import React from 'react';
import { Layout } from 'antd';
import Topbar from './components/Topbar';

const { Header, Content } = Layout;

type BaseLayoutProps = {
  children: React.ReactNode;
};

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ backgroundColor: 'white' }}>
        <Topbar />
      </Header>
      <Content style={{ overflow: 'auto' }}>
        {children}
      </Content>
    </Layout>
  );
}

export default BaseLayout;
