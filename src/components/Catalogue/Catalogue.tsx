import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { useStock, Model } from '../../modules/stock';

import Price from '../Price';
import { Heading } from '../../utils';
import { Container, StockList } from './elements';
import iPhoneIMG from '../HomePage/cover.jpg';

const { Meta } = Card;

type Props = {
  trade?: boolean;
};

function Catalogue({ trade = false }: Props) {
  const { stock } = useStock();

  const renderStockItem = (si: Model) => {
    return (
      <Link
        key={si.slug}
        to={{
          pathname: `${si.slug}`,
          state: { si },
        }}
      >
        <Card hoverable cover={<img src={iPhoneIMG} alt={si.model} />}>
          <Meta
            title={si.model}
            description={
              <div>
                Starting from <Price amt={si.configurations[0].price} />
              </div>
            }
          />
        </Card>
      </Link>
    );
  };

  return (
    <Container>
      <Heading>Choose a model{trade && ' to trade for'}.</Heading>
      <StockList>
        {stock
          .filter(si => si.configurations.length)
          .map(si => renderStockItem(si))}
      </StockList>
    </Container>
  );
}

export default Catalogue;
