import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './tamplete';


export const transporter = nodemailer.createTransport({

service:'gmail',
auth:{
    user:process.env.NODEMAILER_EMAIL!,
    pass:process.env.NODEMAILER_PASSWORD!,
}


})

export const sendWelcomeEmail =async({email,name,intro}:WelcomeEmailData)=>{
    const htmlTemplate =WELCOME_EMAIL_TEMPLATE
      .replace('{{name}}',name)
      .replace('{{intro}}',intro);


   const mailOptions={
    from:'"FinTracker" <Fintracker@56123.com>',
    to:email,
    subject:'Welcome to FinTracker -  your stock market toolkit is ready!',
    text:'Thanks to joining Fintracker',
    html:htmlTemplate,

   }     
   
   await transporter.sendMail(mailOptions);

}