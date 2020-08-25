const express = require('express');
const cors = require('cors');
require('dotenv/config');
require('express-async-errors');

const SESMailProvider = require('./providers/SESMailProvider');

const app = express();

app.use(express.json());
app.use(cors({
  preflightContinue: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept']
}))
// app.use((request, response, next) => {
//   response.header('Access-Control-Allow-Origin', '*');
//   response.header('Access-Control-Allow-Header', 
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )

//   if (request.method === 'OPTIONS') {
//     response.header('Access-Control-Allow-Methods', 'GET, POST')
//   }
//   next();
// });

app.post('/getting-email', async (request, response) => {
  const { hour, minute, date } = request.body;
  const emailUser = request.body.email;

  const mailProvider = new SESMailProvider();
  
  const emailEnterprise = 'Vitor@vp-media.com.br';

  await mailProvider.sendMailToEnterprise(emailEnterprise, emailUser)
  await mailProvider.sendMailToUser(emailEnterprise, emailUser, date, hour, minute)

  return response.status(204).json();
})

app.listen(process.env.PORT || 3333);