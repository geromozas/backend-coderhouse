import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "mozasgeronimo@gmail.com",
    pass: "bkmeroxtvcibfqdv",
  },
});


