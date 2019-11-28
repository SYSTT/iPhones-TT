import React from 'react';
import { User } from 'firebase';
import { Spin, Select, Collapse, Badge } from 'antd';

import { Heading, Colors } from '../../../utils';
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

const { Panel } = Collapse;

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
    <div>
      <h3>User info</h3>
      <p>
        First name: {firstName}, Last name: {lastName}
      </p>
      <p>Email: {email}</p>
      <p>Phone number: {phoneNumber}</p>
    </div>
  );
};

const OrderView = ({ order, updateStatus }: OrderViewProps) => {
  return (
    <OrderViewContainer>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ marginRight: '2em' }}>
          <h3>Order ID: {order.id}</h3>
          <p>Model: {order.orderItem.model}</p>
          <p>Memory: {order.orderItem.memory}</p>
          <p>Color: {order.orderItem.color}</p>
          <p>Quantity: {order.orderItem.quantity}</p>
        </div>
        <ProfileInfoView {...order.profileInfo} />
      </div>
      <Select
        value={order.status}
        onChange={updateStatus}
        style={{ width: 100 }}
      >
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
  const { orders, updateOrderStatus, loading: loadingOrders } = useOrders();
  const {
    tradeOrders,
    updateTradeOrderStatus,
    loading: loadingTradeOrders,
  } = useTradeOrders();

  const renderPanelHeader = (header: string, count: number) => {
    console.log({ header, count });
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {header}{' '}
        <Badge
          count={count}
          style={{
            backgroundColor: Colors.Red,
          }}
        />
      </div>
    );
  };

  const renderQuickInfo = (
    firstName: string,
    lastName: string,
    status: string,
  ) => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {firstName} {lastName}
        </div>
        <div>{status}</div>
      </div>
    );
  };

  const activeBuyOrders = orders.filter(
    order => order.status !== 'cancelled' && order.status !== 'completed',
  );
  const activeTradeOrders = tradeOrders.filter(
    order => order.status !== 'cancelled' && order.status !== 'completed',
  );
  const otherBuyOrders = orders.filter(
    order => order.status === 'cancelled' || order.status === 'completed',
  );
  const otherTradeOrders = tradeOrders.filter(
    order => order.status === 'cancelled' || order.status === 'completed',
  );

  return (
    <AuthCheck user={user} fallback={<Spin />} requiredClaims={{ admin: true }}>
      <Container>
        <Heading>Orders</Heading>
        <Collapse defaultActiveKey={['buy-orders', 'trade-orders']}>
          {!loadingOrders && (
            <Panel
              header={renderPanelHeader('Buy Orders', activeBuyOrders.length)}
              key="buy-orders"
            >
              {activeBuyOrders.map(order => (
                <Collapse key={order.id}>
                  <Panel
                    header={renderQuickInfo(
                      order.profileInfo.firstName,
                      order.profileInfo.lastName,
                      order.status,
                    )}
                    key="trade-orders"
                  >
                    <OrderView
                      key={order.id}
                      order={order}
                      updateStatus={(newStatus: OrderStatus) =>
                        updateOrderStatus(order.id, newStatus)
                      }
                    />
                  </Panel>
                </Collapse>
              ))}
            </Panel>
          )}
          {!loadingTradeOrders && (
            <Panel
              header={renderPanelHeader(
                'Trade Orders',
                activeTradeOrders.length,
              )}
              key="trade-orders"
            >
              {activeTradeOrders.map(order => (
                <Collapse key={order.id}>
                  <Panel
                    header={renderQuickInfo(
                      order.profileInfo.firstName,
                      order.profileInfo.lastName,
                      order.status,
                    )}
                    key="trade-orders"
                  >
                    <OrderView
                      key={order.id}
                      order={order}
                      updateStatus={(newStatus: OrderStatus) =>
                        updateTradeOrderStatus(order.id, newStatus)
                      }
                    />
                    <TradeItemView {...order.tradeItem} />
                  </Panel>
                </Collapse>
              ))}
            </Panel>
          )}
          {!loadingOrders && (
            <Panel
              header={renderPanelHeader(
                'Inactive Buy Orders',
                otherBuyOrders.length,
              )}
              key="inactive-buy-orders"
            >
              {otherBuyOrders.map(order => (
                <Collapse key={order.id}>
                  <Panel
                    header={renderQuickInfo(
                      order.profileInfo.firstName,
                      order.profileInfo.lastName,
                      order.status,
                    )}
                    key="trade-orders"
                  >
                    <OrderView
                      order={order}
                      updateStatus={(newStatus: OrderStatus) =>
                        updateTradeOrderStatus(order.id, newStatus)
                      }
                    />
                  </Panel>
                </Collapse>
              ))}
            </Panel>
          )}
          {!loadingTradeOrders && (
            <Panel
              header={renderPanelHeader(
                'Inactive Trade Orders',
                otherTradeOrders.length,
              )}
              key="inactive-trade-orders"
            >
              {otherTradeOrders.map(order => (
                <Collapse key={order.id}>
                  <Panel
                    header={renderQuickInfo(
                      order.profileInfo.firstName,
                      order.profileInfo.lastName,
                      order.status,
                    )}
                    key="trade-orders"
                  >
                    <OrderView
                      order={order}
                      updateStatus={(newStatus: OrderStatus) =>
                        updateTradeOrderStatus(order.id, newStatus)
                      }
                    />
                    <TradeItemView {...order.tradeItem} />
                  </Panel>
                </Collapse>
              ))}
            </Panel>
          )}
        </Collapse>
      </Container>
    </AuthCheck>
  );
};

export default AdminOrdersPage;
