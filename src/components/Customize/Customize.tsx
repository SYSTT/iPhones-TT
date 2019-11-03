import React, { useState, useEffect } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import { Redirect } from 'react-router-dom';
import { Carousel } from 'antd';

import {
  Model,
  useStock,
  Condition,
  Configuration,
  Color,
} from '../../modules/stock';
import { useCart } from '../../modules/cart';

import { Heading, RoundedButton, ButtonList } from '../../utils';
import ConditionSelector from './ConditionSelector';
import ColorSelector from './ColorSelector';
import MemorySelector from './MemorySelector';
import { Container, Content } from './elements';

import iPhoneIMG from '../../pages/HomePage/cover.jpg';

type Props = RouteComponentProps<
  { itemSlug: string },
  StaticContext,
  { si?: Model }
> & {
  allowAddToCart?: boolean;
  tradeAmt?: number;
};

const Customize: React.FC<Props> = ({ match, tradeAmt }) => {
  const [condition, setCondition] = useState<Condition>();
  const [color, setColor] = useState<string>();
  const [memory, setMemory] = useState<number>();
  const [si, setSI] = useState<Model>();
  const [configs, setConfigs] = useState<Configuration[]>([]);
  const [loading, setLoading] = useState(true);
  const { getModelBySlug, loading: stockLoading } = useStock();
  const { addItemToCart, added } = useCart();

  useEffect(() => {
    if (!stockLoading) {
      const found = getModelBySlug(match.params.itemSlug);
      setSI(found);
      setLoading(false);
      if (found) {
        setConfigs(found.configurations);
      }
    }
  }, [match.params.itemSlug, stockLoading, getModelBySlug]);

  if (!si) {
    if (!loading) {
      return <Redirect to=".." />;
    }
    return null;
  }

  if (added) {
    return <Redirect to="/cart" />;
  }

  const addToCart = () => {
    const match = si.configurations.find(
      config =>
        config.condition === condition &&
        config.color === color &&
        config.memory === memory,
    );
    if (!match) {
      return;
    }
    addItemToCart({
      model: si.model,
      id: `${si.slug}-${match.condition}-${match.color}-${match.memory}`,
      slug: si.slug,
      quantity: 1,
      ...match,
    });
  };

  const handleConditionChange = (condition: Condition) => {
    setCondition(condition);
    setColor(undefined);
    setMemory(undefined);
  };

  const handleColorChange = (color: Color) => {
    setColor(color);
    setMemory(undefined);
  };

  return (
    <Container>
      <Carousel>
        <img className="carousel-item" src={iPhoneIMG} alt={si.model} />
        <img className="carousel-item" src={iPhoneIMG} alt={si.model} />
        <img className="carousel-item" src={iPhoneIMG} alt={si.model} />
      </Carousel>
      <Content>
        <Heading>
          {tradeAmt ? 'Trade for' : 'Buy'} {si.model}.
        </Heading>
        <ConditionSelector
          condition={condition}
          setCondition={handleConditionChange}
          configs={configs}
          tradeAmt={tradeAmt}
        />
        <ColorSelector
          color={color}
          setColor={handleColorChange}
          configs={configs.filter(
            config => !condition || config.condition === condition,
          )}
          disabled={!condition}
        />
        <MemorySelector
          memory={memory}
          setMemory={setMemory}
          configs={configs.filter(
            config =>
              (!condition || config.condition === condition) &&
              (!color || config.color === color),
          )}
          disabled={!color}
          tradeAmt={tradeAmt}
        />
        <ButtonList center>
          {!tradeAmt && (
            <RoundedButton disabled={!memory} onClick={addToCart}>
              Add to Cart
            </RoundedButton>
          )}
          <RoundedButton type="primary" disabled={!memory}>
            Checkout
          </RoundedButton>
        </ButtonList>
      </Content>
    </Container>
  );
};

export default Customize;
