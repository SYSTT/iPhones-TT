const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
const { dedent, price } = require('./utils');
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ttmobideliveryTest@gmail.com',
        pass: 'JarAllEth',
    },
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        const {
            order,
            email,
            tel,
            name,
            address,
        } = req.body;

        let text = `${name} has made a booking!\n`;
        text += dedent`
            Contact info: ${tel}, ${email}
            Address: ${address}
        `;
        text += dedent`
            Order Information:
        `;
        for (let orderItem of order) {
            text += dedent`
                ${orderItem.quantity}x ${orderItem.item.model} ${orderItem.item.memory}
                ${orderItem.quantity}x ${price(orderItem.item.price)} = ${price(orderItem.quantity * orderItem.item.price)}
            `;
        }
        const total = order.reduce((acc, cur) => acc + cur.quantity * cur.item.price, 0);
        text += dedent`
            Total: ${price(total)}
        `;

        const mailOptions = {
            from: 'TT Mobile Delivery <ttmobideliveryTest@gmail.com>',
            to: 'joshuatallum@gmail.com',
            subject: `New Order - ${name}`, // email subject
            text,
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send('Sent');
        });
    });    
});
