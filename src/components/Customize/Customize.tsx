import React, { useState, useEffect } from 'react';
import { RouteComponentProps, StaticContext, Redirect } from 'react-router';
import { Carousel } from 'antd';

import { Model, useStock, Condition, Configuration, Color } from '../../modules/stock';

import iPhoneIMG from '../HomePage/cover.jpg';

import { Heading, RoundedButton, ButtonList } from '../../utils';
import { Container, Content } from './elements';
import ConditionSelector from './ConditionSelector';
import ColorSelector from './ColorSelector';
import MemorySelector from './MemorySelector';

function Customize({
  match,
}: RouteComponentProps<{ itemSlug: string}, StaticContext, { si?: Model }>) {
  const [condition, setCondition] = useState<Condition>();
  const [color, setColor] = useState();
  const [memory, setMemory] = useState<number>();
  const [si, setSI] = useState<Model>();
  const [configs, setConfigs] = useState<Configuration[]>([]);
  const [loading, setLoading] = useState(true);
  const { getModelBySlug, loading: stockLoading } = useStock();

  useEffect(() => {
    if (!stockLoading) {
      const found = getModelBySlug(match.params.itemSlug);
      setSI(found);
      setLoading(false);
      if (found) {
        setConfigs(found.configurations);
      } 
    }
  }, [match.params.itemSlug, stockLoading]);

  if (!si) {
    if (!loading) {
      return <Redirect to="/buy" />;
    }
    return null;
  }

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
        <Heading>Buy {si.model}</Heading>
        <ConditionSelector
          condition={condition}
          setCondition={handleConditionChange}
          configs={configs}
        />
        <ColorSelector
          color={color}
          setColor={handleColorChange}
          configs={configs.filter(
            config => !condition || config.condition === condition
          )}
          disabled={!condition}
        />
        <MemorySelector
          memory={memory}
          setMemory={setMemory}
          configs={configs.filter(
            config =>
              (!condition || config.condition === condition) &&
              (!color || config.color === color)
          )}
          disabled={!color}
        />
        <ButtonList center>
          <RoundedButton disabled={!memory}>
            Add to Cart
          </RoundedButton>
          <RoundedButton type="primary" disabled={!memory}>
            Checkout
          </RoundedButton>
        </ButtonList>
      </Content>
    </Container>
  );
}

export default Customize;
