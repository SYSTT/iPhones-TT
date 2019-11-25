/* eslint-disable @typescript-eslint/no-var-requires */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });
const { price } = require('./utils');
admin.initializeApp();

const TRADE_MARGIN = 1000;

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().sendemail.user,
    pass: functions.config().sendemail.password,
  },
});

function generateOrderText(profileInfo, orders) {
  return `
Hi ${profileInfo.firstName},

Thanks for choosing T&T Mobile Delivery to buy your iPhone${
    orders.length > 1 ? 's' : ''
  }.

Your order is currently pending. Please expect to receive a call within 24 hours to confirm your order.

Here is a summary of your order:
${orders
  .map(
    ({ orderItem }) =>
      `${orderItem.model} ${orderItem.memory}GB ${orderItem.color} - ${price(
        orderItem.price,
      )}`,
  )
  .join('\n')}

T&T Mobile Delivery
  `.trim();
}

function generateTradeOrderText(profileInfo, tradeOrder) {
  const { tradeItem, orderItem } = tradeOrder;
  const cashDifference = orderItem.cost + TRADE_MARGIN - tradeItem.price;
  return `
Hi ${profileInfo.firstName},

Thanks for choosing T&T Mobile Delivery to trade your iPhone.

Your trade is currently pending. Please expect to receive a call within 24 hours to confirm your trade.

Here is a summary of your trade:
Your device: ${tradeItem.model} ${tradeItem.memory}GB ${tradeItem.color}
Device you are trading for: ${orderItem.model} ${orderItem.memory}GB ${
    orderItem.color
  }
Cash difference: You ${cashDifference > 0 ? 'pay' : 'get'} ${price(
    Math.abs(cashDifference),
  )}

T&T Mobile Delivery
  `.trim();
}

function sendAdminNotification(orders) {
  const { profileInfo } = orders[0];
  let text;
  let orderType = 'Order';
  if (orders[0].tradeItem) {
    const { tradeItem, orderItem } = orders[0];
    orderType = 'Trade';
    text = `
User details:
Name: ${profileInfo.firstName} ${profileInfo.lastName}
Email: ${profileInfo.email}
Phone number: ${profileInfo.phoneNumber}

Order details:
Their device: ${tradeItem.model} ${tradeItem.memory}GB ${
      tradeItem.color
    } - ${price(tradeItem.price)}
Device they want: ${orderItem.model} ${orderItem.memory}GB ${
      orderItem.color
    } - ${price(orderItem.price)}
Cash difference: ${price(orderItem.cost + TRADE_MARGIN - tradeItem.price)}

https://tntmobiledelivery.com/admin/orders
    `.trim();
  } else {
    text = `
User details:
Name: ${profileInfo.firstName} ${profileInfo.lastName}
Email: ${profileInfo.email}
Phone number: ${profileInfo.phoneNumber}

Order details:
${orders
  .map(
    ({ orderItem }) =>
      `${orderItem.model} ${orderItem.memory}GB ${orderItem.color} - ${price(
        orderItem.price,
      )}`,
  )
  .join('\n')}

Total: ${price(
      orders.reduce((total, { orderItem }) => total + orderItem.price, 0),
    )}

https://tntmobiledelivery.com/admin/orders
  `.trim();
  }

  const adminMailOptions = {
    from: 'T&T Mobile Delivery <tntmobiledelivery@gmail.com>',
    to: 'tntmobiledelivery@gmail.com',
    subject: `New ${orderType} - ${profileInfo.firstName} ${profileInfo.lastName}`,
    text: text,
  };

  transporter.sendMail(adminMailOptions);
}

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { orders } = req.body;

    if (orders.length === 0) {
      return res
        .status(400)
        .send('An array of orders must be in the request body');
    }

    const { profileInfo } = orders[0];

    const userMailOptions = {
      from: 'T&T Mobile Delivery <tntmobiledelivery@gmail.com>',
      to: profileInfo.email,
      subject: 'Thank you for your order',
      text: orders[0].tradeItem
        ? generateTradeOrderText(profileInfo, orders[0])
        : generateOrderText(profileInfo, orders),
    };

    sendAdminNotification(orders);

    return transporter.sendMail(userMailOptions, err => {
      if (err) {
        return res.send(err.toString());
      }
      return res.send('Sent');
    });
  });
});
