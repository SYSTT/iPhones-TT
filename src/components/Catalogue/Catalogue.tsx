import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { useStock, Model, NEW } from '../../modules/stock';

import Price from '../Price';
import { Heading } from '../../utils';
import { Container, StockList } from './elements';
import iPhoneIMG from '../../pages/HomePage/cover.jpg';
import getCashDifference from '../../utils/getCashDifference';

const { Meta } = Card;

type Props = {
  tradeAmt?: number;
};

const Catalogue: React.FC<Props> = ({ tradeAmt }) => {
  const { stock } = useStock();

  const renderTradePrice = (
    orderItemPrice: number,
    orderItemCost: number,
    tradeItemPrice: number,
  ) => {
    const cashDifference = getCashDifference(orderItemCost, tradeItemPrice);
    return (
      <div>
        You <strong>{cashDifference > 0 ? 'pay' : 'get'}</strong>
        <Price
          amt={orderItemPrice}
          reduction={orderItemPrice - cashDifference}
          block
          abs
        />
      </div>
    );
  };

  const renderStockItem = (si: Model) => {
    return (
      <Link
        key={si.slug}
        to={{
          pathname: `${si.slug}/`,
          state: { si },
        }}
      >
        <Card
          hoverable
          cover={
            <img
              style={{ height: '100%', objectFit: 'cover' }}
              src={si.imageUrls[0] || iPhoneIMG}
              alt={si.model}
            />
          }
        >
          <Meta
            title={si.model}
            description={
              <div>
                Starting from:
                {tradeAmt !== undefined ? (
                  renderTradePrice(
                    si.configurations[0].price,
                    si.configurations[0].cost,
                    tradeAmt,
                  )
                ) : (
                  <Price amt={si.configurations[0].price} block />
                )}
              </div>
            }
          />
        </Card>
      </Link>
    );
  };

  return (
    <Container>
      <Heading>
        {!tradeAmt ? 'Select Model' : 'Which iPhone do you want?'}
      </Heading>
      <StockList>
        {stock
          .sort((a, b) => a.configurations[0].price - b.configurations[0].price)
          .filter(
            si =>
              si.configurations.length &&
              si.configurations.find(
                config => config.condition === NEW || config.stock > 0,
              ),
          )
          .map(si => renderStockItem(si))}
      </StockList>
    </Container>
  );
};

export default Catalogue;
