const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
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
        
        const email = req.query.email;
        const contact = req.query.contact;
        const name = req.query.name;
        const address = req.query.address;
        const model = req.query.model;
        const memory = req.query.memory;
        const price = req.query.price;

        const mailOptions = {
            from: 'TT Mobile Delivery <ttmobideliveryTest@gmail.com>',
            to: 'tntmobiledelivery@gmail.com',
            subject: `New Booking - ${name}`, // email subject
            text: `
                ${name} has made a booking! \n
                Contact info: ${contact}, ${email} \n
                Order details: ${model} ${memory}, $${price} \n
                Address: ${address}
            `,
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
