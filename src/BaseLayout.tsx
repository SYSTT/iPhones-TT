import React from 'react';
import { Layout } from 'antd';
import Topbar from './components/Topbar';

const { Header, Content } = Layout;

type BaseLayoutProps = {
  children: React.ReactNode;
};

function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Layout>
      <Header style={{ backgroundColor: 'white' }}>
        <Topbar />
      </Header>
      <Content>
        {children}
      </Content>
    </Layout>
  );
}

export default BaseLayout;
