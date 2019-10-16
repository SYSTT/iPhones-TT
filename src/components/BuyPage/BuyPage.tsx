import React from 'react';
import { Steps, Icon } from 'antd';
import { Switch, Route, RouteComponentProps } from 'react-router';
import { Location } from 'history';

import Catalogue from '../Catalogue';
import Customize from '../Customize';
import { Container } from './elements';
const { Step } = Steps;

const locationToStep = (location: Location) => {
  const pathParts = location.pathname.split('/').filter(Boolean);
  return pathParts.length - 1;
};

function BuyPage({
  location,
  match,
}: RouteComponentProps) {
  const currentStep = locationToStep(location);
  return (
    <Container>
      <Switch>
        <Route
          path={`${match.path}/:itemSlug`}
          component={Customize}
        />
        <Route
          path={`${match.path}`}
          component={Catalogue}
        />
      </Switch>
      <Steps
        type="navigation"
        size="small"
        current={currentStep}
      >
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

export default BuyPage;
