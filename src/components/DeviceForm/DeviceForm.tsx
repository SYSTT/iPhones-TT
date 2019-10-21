import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Alert, Icon, Select, Button, Divider } from 'antd';

import { useTradeDevices, Device, DeviceOption } from '../../modules/trade-devices';

import { Heading, OptionList, OptionButton, Price, ButtonList, RoundedButton } from '../../utils';
import { Container } from './elements';

const AlertDescription = (
  <div>
    <p>
      Currently we can only accept iPhones with A-Grade quality. This means
    </p>
    <ul>
      <li>100% perfect working condition.</li>
      <li>Near perfect to brand new physical condition.</li>
      <li>Above 80% battery health (Find it in Settings > Battery > Battery Health).</li>
    </ul>
    <p>Additionally, we do not accept iPhones with locked iCloud.</p>
  </div>
);

function DeviceForm() {
  const history = useHistory();
  const { tradeDevices, getTradeDeviceBySlug } = useTradeDevices();
  const [device, setDevice] = useState<Device>();
  const [option, setOption] = useState<DeviceOption>();

  function onChangeDevice(deviceSlug: string) {
    if (deviceSlug !== 'unseleced') {
      setDevice(getTradeDeviceBySlug(deviceSlug));
    }
  }

  function onSubmit() {
    if (device && option) {
      history.push(`${device.slug}-${option.memory}gb`)
    }
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
      <h3 style={{ marginBottom: 12, marginTop: 24 }}>Choose your device's model.</h3>
      <Select defaultValue="unselected" onChange={onChangeDevice}>
        <Select.Option value="unselected">Select your model</Select.Option>
        {tradeDevices.map(td => (
          <Select.Option key={td.id} value={td.slug}>{td.model}</Select.Option>
        ))}
      </Select>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="link">Don't see your device?</Button>
      </div>
      {device && (
        <>
          <h3 style={{ marginBottom: 12, marginTop: 24 }}>Choose your device's memory.</h3>
          <OptionList cols={2}>
            {device.options.map(opt => (
              <OptionButton
                selected={option && option.memory === opt.memory}
                type="ghost"
                onClick={() => setOption(opt)}
              >
                {opt.memory}GB
              </OptionButton>
            ))}
          </OptionList>
        </>
      )}
      {option && (
        <>
          <Divider />
          <h3 style={{ marginBottom: 12 }}>Your devices value.</h3>
          <Price amt={option.price} />
          <ButtonList style={{ marginTop: 24 }} center>
            <RoundedButton type="primary" onClick={onSubmit}>
              Continue
            </RoundedButton>
          </ButtonList>
        </>
      )}

    </Container>
  );
}

export default DeviceForm;
