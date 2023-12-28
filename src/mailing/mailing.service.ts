import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailingService {
  private oauth2Client = new google.auth.OAuth2(
    '250643032761-eoobg3sp104fvdp427mk4ne6j72df57u.apps.googleusercontent.com',
    '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',
    'https://developers.google.com/oauthplayground'
  );

  constructor(
    private configService: ConfigService,
    private mailerService: MailerService
  ) {
    this.oauth2Client.setCredentials({
      refresh_token:
        '1//048RI0B1EtJgXCgYIARAAGAQSNwF-L9IrBK5n0nEs2uWo2nqSU618q5Yck3OCUQC5c9pdGbPFJ9SARszdqrlew8x-np_gBP87o88',
    });
  }

  private async setTransport() {
    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'pollmyevent@gmail.com',
        clientId: '250643032761-eoobg3sp104fvdp427mk4ne6j72df57u.apps.googleusercontent.com',
        clientSecret: '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',
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
