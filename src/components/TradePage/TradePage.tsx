import React, { useState, useEffect } from 'react';
import { Steps, Icon } from 'antd';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Location } from 'history';

import Catalogue from '../Catalogue';
import Customize from '../Customize';
import DeviceForm from '../DeviceForm';
import { Container } from './elements';
import {
  useTradeDevices,
  Device,
  DeviceOption,
} from '../../modules/trade-devices';
const { Step } = Steps;

const locationToStep = (location: Location) => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  return pathParts.length - 1;
};

const locationToTradeSlug = (location: Location) => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  return pathParts[1];
};

const TradePage: React.FC<RouteComponentProps> = ({ location, match }) => {
  const currentStep = locationToStep(location);
  const [, setTradeDevice] = useState<Device>();
  const [tradeDeviceOption, setTradeDeviceOption] = useState<DeviceOption>();
  const { getTradeDeviceBySlug } = useTradeDevices();
  const tradeSlug = locationToTradeSlug(location);

  useEffect(() => {
    if (tradeSlug) {
      const tradeDeviceSlug = tradeSlug.substring(0, tradeSlug.length - 5);
      const memoryHumanReadable = tradeSlug.substring(tradeSlug.length - 4);
      if (!tradeDeviceSlug || !memoryHumanReadable) {
        return;
      }
      const memory = parseInt(memoryHumanReadable);
      const device = getTradeDeviceBySlug(tradeDeviceSlug);
      console.log(memory, device);
      if (!device) {
        return;
      }
      setTradeDevice(device);
      const matchingOptions = device.options.filter(
        opt => opt.memory === memory,
      );
      if (!matchingOptions.length) {
        return;
      }
      setTradeDeviceOption(matchingOptions[0]);
    }
  }, [tradeSlug, getTradeDeviceBySlug]);

  return (
    <Container>
      <Switch>
        <Route
          path={`${match.path}/:tradeSlug/:itemSlug`}
          render={routeComponentProps => (
            <Customize
              allowAddToCart={false}
              tradeAmt={tradeDeviceOption ? tradeDeviceOption.price : 0}
              {...routeComponentProps}
            />
          )}
        />
        <Route
          path={`${match.path}/:tradeSlug`}
          render={() => (
            <Catalogue
              tradeAmt={tradeDeviceOption ? tradeDeviceOption.price : 0}
            />
          )}
        />
        <Route path={`${match.path}`} component={DeviceForm} />
      </Switch>
      <Steps type="navigation" size="small" current={currentStep}>
        <Step title="Details" icon={<Icon type="build" />} />
        <Step title="Choose" icon={<Icon type="mobile" />} />
        <Step title="Customize" icon={<Icon type="sliders" />} />
      </Steps>
    </Container>
  );
};

export default TradePage;
