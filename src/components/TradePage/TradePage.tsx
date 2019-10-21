import React from 'react';
import { Steps, Icon } from 'antd';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Location } from 'history';

import Catalogue from '../Catalogue';
import Customize from '../Customize';
import DeviceForm from '../DeviceForm';
import { Container } from './elements';
const { Step } = Steps;

const locationToStep = (location: Location) => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  return pathParts.length - 1;
};

function TradePage({
  location,
  match,
}: RouteComponentProps) {
  const currentStep = locationToStep(location);
  return (
    <Container>
      <Switch>
        <Route
          path={`${match.path}/:tradeSlug/:itemSlug`}
          render={routeComponentProps => (
            <Customize allowAddToCart={false} {...routeComponentProps} />
          )}
        />
        <Route
          path={`${match.path}/:tradeSlug`}
          component={Catalogue}
        />
        <Route
          path={`${match.path}`}
          component={DeviceForm}
        />
      </Switch>
      <Steps
        type="navigation"
        size="small"
        current={currentStep}
      >
        <Step
          title="Details"
          icon={<Icon type="build" />}
        />
        <Step
          title="Choose"
          icon={<Icon type="mobile" />}
        />
        <Step
          title="Customize"
          icon={<Icon type="sliders" />}
        />
      </Steps>
    </Container>
  );
}

export default TradePage;
