import nodemailer from 'nodemailer';
import {logger} from '../middleware/logger';
import dotenv from "dotenv";
dotenv.config();

// Used to send password reset code via email
export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    
    // Transporter configuration
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });

    // Setup mail options
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    // Attempt to send email
    logger.info(`Sending reset mail to - ${to}`);
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            logger.error(error);
        } else {
            logger.info('Reset Email sent: ' + info.response);
        }
    });
}