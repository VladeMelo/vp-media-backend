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

  async sendMailToEnterprise(emailEnterprise, emailUser){
    const mailTemplateProvider = new HandlebarsMailTemplateProvider();

    const newUserTemplate = path.resolve(  
      __dirname,  
      '..',
      'views',  
      'new_user.hbs',  
    );

    await this.client.sendMail({  
      from: {
        address: emailEnterprise,
      },
      to: {
        address: emailEnterprise,
      },
      subject: '[VP]: Novo usuário',  
      html: await mailTemplateProvider.parse(newUserTemplate, { email: emailUser })
    }); 
  }

  async sendMailToUser(emailEnterprise, emailUser, date, hour, minute){
    const mailTemplateProvider = new HandlebarsMailTemplateProvider();

    const scheduleConfirmedTemplate = path.resolve(  
      __dirname,  
      '..',
      'views',  
      'schedule_confirmed.hbs',  
    );

    const formattedHour = hour >= 10 ? hour : `0${hour}`
    const formattedMinte = minute === 30 ? 30 : '00'
    const formattedDate = new Date(date)

    await this.client.sendMail({  
      from: {
        address: emailEnterprise,
      },
      to: {
        address: emailUser,
      },
      subject: '[VP]: Ligação confirmada',  
      html: await mailTemplateProvider.parse(scheduleConfirmedTemplate, {
        day: formattedDate.getDate() - 1,
        month: formattedDate.getMonth(),
        year: formattedDate.getFullYear(),
        hour: formattedHour,
        minute: formattedMinte 
      })
    }); 
  }
}

module.exports = SESMailProvider;