import React, { useState } from 'react';
import { Alert, Icon, Select, Divider, Input, Tooltip } from 'antd';

import { useTradeDevices, Device } from '../../modules/trade-devices';
import { useStock, Model } from '../../modules/stock';

import {
  Heading,
  OptionList,
  OptionButton,
  ButtonList,
  RoundedButton,
  dedup,
} from '../../utils';
import { Container } from './elements';
import { TradeItem } from '../../modules/orders';
import { Color } from '../../modules/stock';
import Uploader from '../Uploader';
import { Link } from 'react-router-dom';

const AlertDescription = (
  <div>
    <p>Currently we can only accept iPhones with A-Grade quality. This means</p>
    <ul>
      <li>Perfect working condition.</li>
      <li>Near perfect physical condition.</li>
      <li>
        Battery Health 80% & up (Find on your iPhone - Settings &gt; Battery
        &gt; Battery Health).
      </li>
      <li>We DO NOT accept stolen or iCloud locked iPhones.</li>
    </ul>
    <p>Additionally, we do not accept iPhones with locked iCloud.</p>
  </div>
);

interface Props {
  setTradeItem: (tradeItem: TradeItem & { price: number }) => void;
}

const DeviceForm: React.FC<Props> = ({ setTradeItem }) => {
  const { tradeDevices } = useTradeDevices();
  const { getModelBySlug } = useStock();
  const [device, setDevice] = useState<Model>();
  const [memory, setMemory] = useState<number>();
  const [color, setColor] = useState<Color>();
  const [price, setPrice] = useState<number>();
  const [issues, setIssues] = useState<string>();
  const [batteryHealth, setBatteryHealth] = useState<number>();
  const [rating, setRating] = useState<number>();
  const [pictureUrls, setPictureUrls] = useState<string[]>([]);

  function onChangeDevice(deviceSlug: string) {
    if (deviceSlug !== 'unseleced') {
      setDevice(getModelBySlug(deviceSlug));
    }
  }

  function onSubmit() {
    if (
      !device ||
      !memory ||
      !color ||
      !price ||
      !issues ||
      !batteryHealth ||
      !rating ||
      pictureUrls.length === 0
    ) {
      return;
    }
    setTradeItem({
      model: device.model,
      slug: device.slug,
      memory,
      color,
      price,
      issues,
      batteryHealth,
      rating,
      pictureUrls,
    });
  }

  const isComplete =
    price !== undefined &&
    issues !== '' &&
    batteryHealth !== undefined &&
    rating !== undefined &&
    pictureUrls.length !== 0;

  return (
    <Container>
      <Heading>Trade Your iPhone</Heading>
      <Alert
        type="warning"
        icon={<Icon type="safety-certificate" />}
        message="A-Grade Quality"
        description={AlertDescription}
        showIcon
      />
      <h3 style={{ marginBottom: 12, marginTop: 24 }}>
        Which iPhone do you have?
      </h3>
      <Select defaultValue="unselected" onChange={onChangeDevice}>
        <Select.Option value="unselected">Select your model</Select.Option>
        {tradeDevices
          .sort((a, b) => a.options[0].price - b.options[0].price)
          .map(td => (
            <Select.Option key={td.id} value={td.slug}>
              {td.model}
            </Select.Option>
          ))}
      </Select>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/about">Don&#39;t see your device?</Link>
      </div>
      {device && (
        <>
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            How many GBs is your iPhone?
          </h3>
          <OptionList cols={2}>
            {dedup(device.configurations, config => config.memory).map(opt => (
              <OptionButton
                key={opt.memory}
                selected={memory !== undefined && memory === opt.memory}
                type="ghost"
                onClick={() => {
                  setMemory(opt.memory);
                  setPrice(opt.price);
                }}
              >
                {opt.memory}GB
              </OptionButton>
            ))}
          </OptionList>
        </>
      )}
      {memory && device && (
        <>
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            What Colour is your iPhone?
          </h3>
          <OptionList cols={2}>
            {dedup(device.configurations, config => config.color).map(opt => (
              <OptionButton
                key={opt.color}
                selected={color !== undefined && color === opt.color}
                type="ghost"
                onClick={() => setColor(opt.color)}
              >
                {opt.color}
              </OptionButton>
            ))}
          </OptionList>
        </>
      )}
      {color && (
        <>
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            Are there any issues with your iPhone?
          </h3>
          <Input
            type="text"
            placeholder="List any issues here"
            value={issues}
            onChange={e => setIssues(e.target.value)}
          />
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            What’s the Battery Health on your iPhone?
          </h3>
          <Input
            type="number"
            placeholder="Settings &gt; Battery &gt; Battery Health"
            value={batteryHealth}
            onChange={e =>
              setBatteryHealth(e.target.value ? +e.target.value : batteryHealth)
            }
          />
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            How would you rate your iPhone out of 10?
          </h3>
          <Input
            type="number"
            suffix="/ 10"
            placeholder="1 - 10"
            value={rating}
            onChange={e => setRating(e.target.value ? +e.target.value : rating)}
          />
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            Upload pictures of your iPhone clearly showing off the screen & all
            sides, showing all & any imperfections.
          </h3>
          <Uploader
            storagePath="trade-order-images"
            accept="image/*,video/*"
            onUploadComplete={setPictureUrls}
          />
        </>
      )}
      <Divider />
      {/* <h3 style={{ marginBottom: 12 }}>Your estimated iPhone value.</h3>
          <h1>
            <Price amt={price} />
          </h1> */}
      <ButtonList style={{ marginTop: 24 }} center>
        <Tooltip
          title={
            isComplete
              ? 'Pick device you want to trade for'
              : 'Please fill out all fields'
          }
        >
          <RoundedButton
            type="primary"
            onClick={onSubmit}
            disabled={!isComplete}
          >
            Continue
          </RoundedButton>
        </Tooltip>
      </ButtonList>
    </Container>
  );
};

export default DeviceForm;
