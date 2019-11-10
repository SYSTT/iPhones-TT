import React from 'react';
import { User } from 'firebase';
import { Spin, Select } from 'antd';

import { Heading } from '../../../utils';
import AuthCheck from '../../../components/AuthCheck/AuthCheck';
import { Container, OrderViewContainer } from './element';
import { useAuth } from '../../../modules/auth';
import {
  useOrders,
  Order,
  useTradeOrders,
  OrderStatus,
  ORDER_STATUSES,
} from '../../../modules/orders';
import { Profile } from '../../../components/forms/ProfileInfoForm';

type OrderViewProps = {
  order: Order;
  updateStatus: (newStatus: OrderStatus) => void;
};

const ProfileInfoView = ({
  email,
  firstName,
  lastName,
  phoneNumber,
}: Omit<Profile, 'password'>) => {
  return (
    <>
      <h3>User info</h3>
      <p>
        First Name: {firstName}, Last Name: {lastName}
      </p>
      <p>Email: {email}</p>
      <p>Phone number: {phoneNumber}</p>
    </>
  );
};

const OrderView = ({ order, updateStatus }: OrderViewProps) => {
  return (
    <OrderViewContainer>
      <h3>Order ID: {order.id}</h3>
      <p>Model: {order.orderItem.model}</p>
      <p>Memory: {order.orderItem.memory}</p>
      <p>Color: {order.orderItem.color}</p>
      <p>Quantity: {order.orderItem.quantity}</p>
      <ProfileInfoView {...order.profileInfo} />
      <Select value={order.status} onChange={updateStatus}>
        {ORDER_STATUSES.map(status => (
          <Select.Option key={status} value={status}>
            {status}
          </Select.Option>
        ))}
      </Select>
    </OrderViewContainer>
  );
};

type Props = {
  user: User | null;
};

const AdminOrdersPage: React.FC<Props> = () => {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { tradeOrders } = useTradeOrders();

  return (
    <AuthCheck user={user} fallback={<Spin />} requiredClaims={{ admin: true }}>
      <Container>
        <Heading>Orders</Heading>
        <p>Buy Orders</p>
        {orders
          .filter(
            order =>
              order.status !== 'cancelled' && order.status !== 'completed',
          )
          .map(order => (
            <OrderView
              key={order.id}
              order={order}
              updateStatus={(newStatus: OrderStatus) =>
                updateOrderStatus(order.id, newStatus)
              }
            />
          ))}
        <p>Trade Orders</p>
      </Container>
    </AuthCheck>
  );
};

export default AdminOrdersPage;
