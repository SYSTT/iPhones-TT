import React from 'react';
import { User } from 'firebase';
import { Spin } from 'antd';

import AuthCheck from '../AuthCheck/AuthCheck';
import Heading from '../Heading/Heading';

import { useStock } from '../../modules/stock';
import StockTable from './StockTable';

type Props = {
  user: User;
};


function AdminPage({ user }: Props) {
  const { stock } = useStock();

  return (
    <AuthCheck user={user} fallback={<Spin />} requiredClaims={{ admin: true }}>
      <Heading title="Admin" text="Update stock" />
      <div
        style={{
          margin: '0 2em'
        }}
      >
      {stock.map(modelStock =>
        <StockTable
          key={modelStock.id}
          title={() => modelStock.model}
          id={modelStock.id}
          model={modelStock.model}
          datasource={modelStock.configurations.map(
            config => ({
              key: `${config.condition}-${config.memory}`,
              ...config,
            })
          )}
        />
      )}
      </div>
    </AuthCheck>
  );
}

export default AdminPage;
