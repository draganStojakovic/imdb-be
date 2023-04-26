import { EMAIL, EMAIL_PASS, EMAIL_USER } from 'constants/envVars';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: EMAIL,
  port: 2525,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});
