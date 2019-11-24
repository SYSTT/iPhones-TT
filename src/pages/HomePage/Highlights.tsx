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
          Your safety is our #1 priority. With over 100 successful transactions
          in 2019, you can trust us for a safe experience.
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
          Get your iPhone’s value & cash difference for trades within seconds!
          Order online & get your iPhone today in Port of Spain & within 48
          hours nationwide!
        </p>
      </div>
      <div>
        <h2>
          <Icon type="like" />
        </h2>
        <h2>Ease</h2>
        <Divider />
        <p>
          Do it all on our website. Whether your trading, buying or browsing,
          it’s all here! No stress. No hassle. 100%&nbsp;Online.
        </p>
        {/* <p>Order an iPhone now.</p> */}
      </div>
    </HighlightsContainer>
  );
};

export default Highlights;
