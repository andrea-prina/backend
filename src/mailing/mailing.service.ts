import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailingService {
  // TODO: Fix mailing service, connect directly to email

  private oauth2Client = new google.auth.OAuth2('', '', 'https://developers.google.com/oauthplayground');

  constructor(
    private configService: ConfigService,
    private mailerService: MailerService
  ) {
    this.oauth2Client.setCredentials({
      refresh_token: '',
    });
  }

  private async setTransport() {
    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'pollmyevent@gmail.com',
        clientId: '',
        clientSecret: '',
        accessToken: await this.getAccessToken(),
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendMail() {
    await this.setTransport();
    this.mailerService
      .sendMail({
        to: 'andreaprina@gmx.com', // list of receivers
        from: 'pollmyevent@gmail.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public async getAccessToken(): Promise<string> {
    try {
      const res = await this.oauth2Client.getAccessToken();
      if (res.token !== null) return res.token;
      throw Error('Access token not generated');
    } catch (error) {
      throw error;
    }
  }
}
