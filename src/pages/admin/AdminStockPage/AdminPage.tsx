import React, { useState } from 'react';
import { User } from 'firebase';
import { Spin, Button, Modal, Form, Input } from 'antd';

import { useStock } from '../../../modules/stock';

import { Heading } from '../../../utils';
import AuthCheck from '../../../components/AuthCheck/AuthCheck';
import StockTable from './StockTable';
import { Container } from './element';
import Uploader from '../../../components/Uploader';

type Props = {
  user: User | null;
};

const AdminStockPage: React.FC<Props> = ({ user }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [stockImageUrls, setStockImageUrls] = useState<string[]>([]);
  const { stock, addModel } = useStock();

  const onSubmit = (
    e:
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    addModel({
      model: newModelName,
      configurations: [],
      imageUrls: stockImageUrls,
    });
  };

  return (
    <AuthCheck user={user} fallback={<Spin />} requiredClaims={{ admin: true }}>
      <Container>
        <Heading>Admin</Heading>
        <p>Update stock</p>
        <div
          style={{
            margin: '0 2em',
          }}
        >
          <Button
            type="primary"
            onClick={() => setShowAddModal(true)}
            style={{ marginBottom: 16 }}
          >
            Add new model
          </Button>
          {stock.map(modelStock => (
            <StockTable
              key={modelStock.id}
              id={modelStock.id}
              model={modelStock.model}
              datasource={modelStock.configurations.map(config => ({
                ...config,
                key: `${config.condition}-${config.color}-${config.memory}`,
              }))}
              imageUrls={modelStock.imageUrls}
            />
          ))}
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
            {newModelName && (
              <Form.Item label="Images">
                <Uploader
                  storagePath={`stock-images/${newModelName}`}
                  accept="image/*"
                  disabled={!newModelName}
                  onUploadComplete={urls => setStockImageUrls(urls)}
                />
              </Form.Item>
            )}
          </Form>
        </Modal>
      </Container>
    </AuthCheck>
  );
};

export default AdminStockPage;
