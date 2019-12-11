import React, { useState, useEffect } from 'react';
import { Steps, Icon } from 'antd';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Location } from 'history';

import Catalogue from '../../components/Catalogue';
import Customize from '../../components/Customize';
import DeviceForm from '../../components/DeviceForm';
import { Container } from './elements';
import { DeviceOption } from '../../modules/trade-devices';
import { TradeItem } from '../../modules/orders';
import { useStock } from '../../modules/stock';
const { Step } = Steps;

const locationToStep = (location: Location) => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  return pathParts.length - 1;
};

const locationToTradeSlug = (location: Location) => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  return pathParts[1];
};

const TradePage: React.FC<RouteComponentProps<
  {},
  {},
  { tradeItem?: TradeItem & { price: number } }
>> = ({ location, match, history }) => {
  const currentStep = locationToStep(location);
  const [tradeItem, setTradeItem] = useState<
    (TradeItem & { price: number }) | undefined
  >(location.state ? location.state.tradeItem : undefined);
  const [tradeDeviceOption, setTradeDeviceOption] = useState<DeviceOption>();
  const { getModelBySlug } = useStock();
  const tradeSlug = locationToTradeSlug(location);

  useEffect(() => {
    if (tradeSlug) {
      const slugParts = tradeSlug.split('--');
      const tradeDeviceSlug = slugParts[0];
      const memoryHumanReadable = slugParts[1];
      if (!tradeDeviceSlug || !memoryHumanReadable) {
        return;
      }
      const memory = parseInt(memoryHumanReadable);
      const device = getModelBySlug(tradeDeviceSlug);

      if (!device) {
        return;
      }
      const matchingOptions = device.configurations.filter(
        opt => opt.memory === memory,
      );
      if (!matchingOptions.length) {
        return;
      }
      setTradeDeviceOption(matchingOptions[0]);
    }
  }, [tradeSlug, getModelBySlug]);

  useEffect(() => {
    if (tradeItem !== undefined) {
      history.push({
        pathname: `${tradeItem.slug}--${tradeItem.memory}gb/`,
        state: { tradeItem },
      });
    }
  }, [tradeItem, history]);

  return (
    <Container>
      <Switch>
        <Route
          path={`${match.path}/:tradeSlug/:itemSlug`}
          render={routeComponentProps => (
            <Customize
              allowAddToCart={false}
              tradeAmt={tradeDeviceOption?.price}
              tradeItem={tradeItem}
              {...routeComponentProps}
            />
          )}
        />
        <Route
          path={`${match.path}/:tradeSlug`}
          render={() => <Catalogue tradeAmt={tradeDeviceOption?.price} />}
        />
        <Route
          path={`${match.path}`}
          render={() => <DeviceForm setTradeItem={setTradeItem} />}
        />
      </Switch>
      <Steps type="navigation" size="small" current={currentStep}>
        <Step title="Details" icon={<Icon type="build" />} />
        <Step title="Choose" icon={<Icon type="mobile" />} />
        <Step title="Trade" icon={<Icon type="sliders" />} />
      </Steps>
    </Container>
  );
};

export default TradePage;
