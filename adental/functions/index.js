const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

admin.initializeApp()


require('dotenv').config()

const {SENDER_EMAIL,SENDER_PASSWORD} = process.env;

exports.sendEmailNotification = functions.firestore.document('submissions/{docId}').onCreate((snap, ctx) => {
  const data = snap.data();

  let authData = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
      user: 'luisfmanzanoa@gmail.com',
      pass: 'accesstonewemail01*$'
    }
  });

  authData.sendMail({
    from:'adental@adental.com',
    to: `${data.email}`,
    subject: 'El usuario ha sido creado',
    text: `${data.email}`,
    html: `${data.email}`,
  }).then(res => console.log('El mensaje fue enviado con exito')).catch(err => console.log(err));
})

