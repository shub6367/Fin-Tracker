import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE } from './tamplete';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL!,
    pass: process.env.NODEMAILER_PASSWORD!,
  }
});

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}', name)
    .replace('{{intro}}', intro);

  const mailOptions = {
    from: '"FinTracker" <Fintracker@56123.com>',
    to: email,
    subject: 'Welcome to FinTracker -  your stock market toolkit is ready!',
    text: 'Thanks to joining Fintracker',
    html: htmlTemplate,
  }     
   
  await transporter.sendMail(mailOptions);
};

export const sendNewsSummaryEmail = async ({ email, newsContent, date }: NewsSummaryEmailData) => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
    .replace('{{date}}', date)
    .replace('{{newsContent}}', newsContent);

  const mailOptions = {
    from: '"FinTracker" <Fintracker@56123.com>',
    to: email,
    subject: `Market News Summary Today -${date}`,
    text: 'Your daily market news summary from FinTracker',
    html: htmlTemplate,
  }     
   
  await transporter.sendMail(mailOptions);
};

interface WelcomeEmailData {
  email: string;
  name: string;
  intro: string;
}

interface NewsSummaryEmailData {
  email: string;
  newsContent: string;
  date: string;
}