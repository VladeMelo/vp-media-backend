const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const path = require('path');

const HandlebarsMailTemplateProvider = require('./HandlebarsMailTemplateProvider')

class SESMailProvider {
  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  async sendMail(name, email, emailUser){
    const mailTemplateProvider = new HandlebarsMailTemplateProvider();

    const newUserTemplate = path.resolve(  
      __dirname,  
      '..',
      'views',  
      'new_user.hbs',  
    );

    await this.client.sendMail({  
      from: {
        name: name,
        address: email,
      },
      to: {
        name: name,
        address: email,
      },
      subject: '[VQ]: Novo usuário',  
      html: await mailTemplateProvider.parse(newUserTemplate, { email: emailUser })
    }); 
  }
}

module.exports = SESMailProvider;