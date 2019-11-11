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
          Your safety is our #1 priority. We meet customers at Police Stations &
          Secured Public Areas within Port of Spain. We’ve traded & sold over
          100 iPhones this year alone! Trust us for a SAFE experience.
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
          Get the Cash Difference on your iPhone within minutes. Order Online &
          meet us in Port of Spain today or have your iPhone delivered to you
          nationwide within 2 days!
        </p>
      </div>
      <div>
        <h2>
          <Icon type="like" />
        </h2>
        <h2>Ease</h2>
        <Divider />
        <p>
          Everything you need is right here on our website! View the Cash
          Difference for your iPhone Trade or Order the iPhone you want. No
          stress. No hassle. 100% Online.
        </p>
        {/* <p>Order an iPhone now.</p> */}
      </div>
    </HighlightsContainer>
  );
};

export default Highlights;
