import React, { useState, useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { Alert, Icon, Select, Button, Divider, Input } from 'antd';
import uuid from 'uuid/v4';

import { useTradeDevices, Device } from '../../modules/trade-devices';

import Price from '../Price';
import {
  Heading,
  OptionList,
  OptionButton,
  ButtonList,
  RoundedButton,
  Colors,
} from '../../utils';
import { Container } from './elements';
import { TradeItem } from '../../modules/tradeOrders';
import { Color } from '../../modules/stock';
import { FirebaseContext } from '../../modules/firebase';

const AlertDescription = (
  <div>
    <p>Currently we can only accept iPhones with A-Grade quality. This means</p>
    <ul>
      <li>100% perfect working condition.</li>
      <li>Near perfect to brand new physical condition.</li>
      <li>
        Above 80% battery health (Find it in Settings &gt; Battery &gt; Battery
        Health).
      </li>
    </ul>
    <p>Additionally, we do not accept iPhones with locked iCloud.</p>
  </div>
);

interface Props {
  setTradeItem: (tradeItem: TradeItem & { price: number }) => void;
}

const DeviceForm: React.FC<Props> = ({ setTradeItem }) => {
  const { tradeDevices, getTradeDeviceBySlug } = useTradeDevices();
  const [device, setDevice] = useState<Device>();
  const [memory, setMemory] = useState<number>();
  const [color, setColor] = useState<Color>();
  const [price, setPrice] = useState<number>();
  const [issues, setIssues] = useState<string>();
  const [batteryHealth, setBatteryHealth] = useState<number>();
  const [rating, setRating] = useState<number>();
  const [pictureUrls, setPictureUrls] = useState<string[]>([]);
  const firebase = useContext(FirebaseContext);

  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();

        reader.onload = async () => {
          const binaryStr = reader.result as ArrayBuffer;
          const ref = firebase.storage.ref(`trade-order-images`).child(uuid());
          const { ref: resultRef } = await ref.put(binaryStr);
          const downloadUrl = await resultRef.getDownloadURL();
          setPictureUrls([...pictureUrls, downloadUrl]);
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [firebase.storage, pictureUrls],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  function onChangeDevice(deviceSlug: string) {
    if (deviceSlug !== 'unseleced') {
      setDevice(getTradeDeviceBySlug(deviceSlug));
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

  return (
    <Container>
      <Heading>What device do you want to trade?</Heading>
      <Alert
        type="warning"
        icon={<Icon type="safety-certificate" />}
        message="A-Grade Quality"
        description={AlertDescription}
        showIcon
      />
      <h3 style={{ marginBottom: 12, marginTop: 24 }}>
        Choose your device&#39;s model.
      </h3>
      <Select defaultValue="unselected" onChange={onChangeDevice}>
        <Select.Option value="unselected">Select your model</Select.Option>
        {tradeDevices.map(td => (
          <Select.Option key={td.id} value={td.slug}>
            {td.model}
          </Select.Option>
        ))}
      </Select>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="link">Don&#39;t see your device?</Button>
      </div>
      {device && (
        <>
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            Choose your device&#39;s memory.
          </h3>
          <OptionList cols={2}>
            {device.options.map(opt => (
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
            Choose your device&#39;s colour.
          </h3>
          <OptionList cols={2}>
            {device.colors.map(colorOption => (
              <OptionButton
                key={colorOption}
                selected={color !== undefined && color === colorOption}
                type="ghost"
                onClick={() => setColor(colorOption)}
              >
                {colorOption}
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
            What is the battery health of your iPhone?
          </h3>
          <Input
            type="number"
            placeholder="Settings &gt; Battery &gt; Battery Health"
            value={batteryHealth}
            onChange={e =>
              setBatteryHealth(e.target.value ? +e.target.value : undefined)
            }
          />
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            What would you rate your iPhone out of 10?
          </h3>
          <Input
            type="number"
            suffix="/ 10"
            placeholder="1 - 10"
            value={rating}
            onChange={e => setRating(+e.target.value)}
          />
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>
            Upload some images of your iPhone below including any imperfections.
          </h3>
          <div
            {...getRootProps({
              style: {
                height: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                border: `1px solid ${Colors['Grey/Light']}`,
                borderRadius: 4,
              },
            })}
          >
            <input {...getInputProps()} />
            <div style={{ textAlign: 'center' }}>Click or drop to upload.</div>
          </div>
        </>
      )}
      {price && issues && batteryHealth && rating && pictureUrls.length !== 0 && (
        <>
          <Divider />
          <h3 style={{ marginBottom: 12 }}>Your devices value.</h3>
          <Price amt={price} />
          <ButtonList style={{ marginTop: 24 }} center>
            <RoundedButton type="primary" onClick={onSubmit}>
              Continue
            </RoundedButton>
          </ButtonList>
        </>
      )}
    </Container>
  );
};

export default DeviceForm;
