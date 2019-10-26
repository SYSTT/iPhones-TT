import React from 'react';
import { Icon, Divider } from 'antd';

import { HighlightsContainer } from './elements';

const Highlights: React.FC = () => {
  return (
    <HighlightsContainer>
      <div>
        <h2>
          <Icon type="safety" />
        </h2>
        <h2>Safety</h2>
        <Divider />
        <p>
          With over 100 iPhones sold and the option to meet at a police station,
          you can trust us for a safe experience.
        </p>
        {/* <p>See what other people are saying here.</p> */}
      </div>
      <div>
        <h2>
          <Icon type="thunderbolt" />
        </h2>
        <h2>Speed</h2>
        <Divider />
        <p>
          Place your order now and schedule a time to pick up your iPhone as
          early as today or tomorrow.
        </p>
      </div>
      <div>
        <h2>
          <Icon type="like" />
        </h2>
        <h2>Ease</h2>
        <Divider />
        <p>
          Order easily online and complete the transaction quickly and
          painlessly at a police station.
        </p>
        {/* <p>Order an iPhone now.</p> */}
      </div>
    </HighlightsContainer>
  );
};

export default Highlights;
