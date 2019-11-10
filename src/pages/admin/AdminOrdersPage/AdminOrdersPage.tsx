import React from 'react';
import { User } from 'firebase';
import { Spin, Select, Divider } from 'antd';

import { Heading } from '../../../utils';
import AuthCheck from '../../../components/AuthCheck/AuthCheck';
import { Container, OrderViewContainer } from './element';
import { useAuth } from '../../../modules/auth';
import {
  useOrders,
  useTradeOrders,
  OrderStatus,
  ORDER_STATUSES,
  TradeItem,
  Order,
  TradeOrder,
} from '../../../modules/orders';
import { Profile } from '../../../components/forms/ProfileInfoForm';

type OrderViewProps = {
  order: Order | TradeOrder;
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

const TradeItemView = (tradeItem: TradeItem) => {
  return (
    <OrderViewContainer>
      <h3>Trade Item</h3>
      <p>Model: {tradeItem.model}</p>
      <p>Memory: {tradeItem.memory}</p>
      <p>Color: {tradeItem.color}</p>
      <p>Issues: {tradeItem.issues}</p>
      <p>Battery Health: {tradeItem.batteryHealth}</p>
      <p>Rating: {tradeItem.rating}</p>
      {tradeItem.pictureUrls.map(pictureUrl => (
        <img
          key={pictureUrl}
          style={{ maxWidth: '100%', maxHeight: '400px' }}
          src={pictureUrl}
          alt="User trade item"
        />
      ))}
    </OrderViewContainer>
  );
};

type Props = {
  user: User | null;
};

const AdminOrdersPage: React.FC<Props> = () => {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { tradeOrders, updateTradeOrderStatus } = useTradeOrders();

  return (
    <AuthCheck user={user} fallback={<Spin />} requiredClaims={{ admin: true }}>
      <Container>
        <Heading>Orders</Heading>
        <h1>Buy Orders</h1>
        {orders
          .filter(
            order =>
              order.status !== 'cancelled' && order.status !== 'completed',
          )
          .map(order => (
            <>
              <OrderView
                key={order.id}
                order={order}
                updateStatus={(newStatus: OrderStatus) =>
                  updateOrderStatus(order.id, newStatus)
                }
              />
              <Divider />
            </>
          ))}
        <h1>Trade Orders</h1>
        {tradeOrders
          .filter(
            order =>
              order.status !== 'cancelled' && order.status !== 'completed',
          )
          .map(order => (
            <>
              <OrderView
                key={order.id}
                order={order}
                updateStatus={(newStatus: OrderStatus) =>
                  updateTradeOrderStatus(order.id, newStatus)
                }
              />
              <TradeItemView {...order.tradeItem} />
              <Divider />
            </>
          ))}
        <h1>Inactive Orders</h1>
        {orders
          .filter(
            order =>
              order.status === 'cancelled' || order.status === 'completed',
          )
          .map(order => (
            <>
              <OrderView
                key={order.id}
                order={order}
                updateStatus={(newStatus: OrderStatus) =>
                  updateTradeOrderStatus(order.id, newStatus)
                }
              />
              <Divider />
            </>
          ))}
        <h1>Inactive Trade Orders</h1>
        {tradeOrders
          .filter(
            order =>
              order.status === 'cancelled' || order.status === 'completed',
          )
          .map(order => (
            <>
              <OrderView
                key={order.id}
                order={order}
                updateStatus={(newStatus: OrderStatus) =>
                  updateTradeOrderStatus(order.id, newStatus)
                }
              />
              <TradeItemView {...order.tradeItem} />
              <Divider />
            </>
          ))}
      </Container>
    </AuthCheck>
  );
};

export default AdminOrdersPage;
