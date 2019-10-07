import React, { useState } from 'react';
import { User } from 'firebase';
import { Spin, Button, Modal, Form, Input } from 'antd';

import AuthCheck from '../AuthCheck/AuthCheck';
import Heading from '../Heading/Heading';

import { useStock } from '../../modules/stock';
import StockTable from './StockTable';

type Props = {
  user: User | null;
};


function AdminPage({ user }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const { stock, addModel } = useStock();

  const onSubmit = (
    e:
      React.MouseEvent<HTMLElement, MouseEvent> |
      React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addModel({ model: newModelName, configurations: [] });
  };

  return (
    <AuthCheck user={user} fallback={<Spin />} requiredClaims={{ admin: true }}>
      <Heading title="Admin" text="Update stock" />
      <div
        style={{
          margin: '0 2em'
        }}
      >
        <Button
          type="primary"
          onClick={() => setShowAddModal(true)}
          style={{ marginBottom: 16 }}
        >
          Add new model
        </Button>
        {stock.map(modelStock =>
          <StockTable
            key={modelStock.id}
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
      <Modal
        visible={showAddModal}
        title="Create new model"
        okText="Create"
        onCancel={() => setShowAddModal(false)}
        onOk={onSubmit}
      >
        <Form onSubmit={onSubmit}>
          <Form.Item label="Model name">
            <Input
              value={newModelName}
              onChange={e => setNewModelName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </AuthCheck>
  );
}

export default AdminPage;
