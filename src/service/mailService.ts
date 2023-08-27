import * as nodemailer from 'nodemailer';

class mailService {
  transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "wyzdrykm@gmail.com",
        pass: "stmmkctjltqbkbnq",
      },
      from: "wyzdrykm@gmail.com",
    })
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.verify((err, succes) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Config is correct");
      }
    })
    await this.transporter.sendMail({
      from: 'social network wyzdrykm@gmail.com',
      to: to,
      subject: 'Активація акаунта' + process.env.API_URL,
      text: 'Hello. This email is for your email verification.',
      html: `
        <div>
          <h1>Account activation</h1>
          <a href="${link}">${link}</a>
        </div>
      `
    })
  }
  async sendRecoveryMail(email:string){

  }
}

export default new mailService()