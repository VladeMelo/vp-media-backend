const express = require('express');
const cors = require('cors');
require('express-async-errors');

const SESMailProvider = require('./providers/SESMailProvider');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/getting-email', async (request, response) => {
  const emailUser = request.body.email;

  const mailProvider = new SESMailProvider();
  
  const nameEnterprise = 'VQ';
  const emailEnterprise = 'Vitor@vp-media.com.br';

  await mailProvider.sendMail(nameEnterprise, emailEnterprise, emailUser)

  return response.status(204).json();
})

app.listen(3333, () => {
  console.log('Server started')
});