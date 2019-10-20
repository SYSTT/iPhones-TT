import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import { useStock, Model } from '../../modules/stock';

import { Heading } from '../../utils';
import { Container, StockList } from './elements';
import iPhoneIMG from '../HomePage/cover.jpg';

const { Meta } = Card;

function Catalogue() {
  const { stock } = useStock();

  const renderStockItem = (si: Model) => {
    return (
      <Link
        key={si.slug}
        to={{
          pathname: `/buy/${si.slug}`,
          state: { si },
        }}
      >
        <Card
          hoverable
          cover={<img src={iPhoneIMG} alt={si.model} />}
        >
          <Meta
            title={si.model}
            description={`Starting from $${si.configurations[0].price.toFixed(2)}`}
          />
        </Card>
      </Link>
    );
  }

  return (
    <Container>
      <Heading>Choose a model</Heading>
      <StockList>
        {stock.filter(si => si.configurations.length).map(si => (
          renderStockItem(si)
        ))}
      </StockList>
    </Container>
  );
}

export default Catalogue;
