import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { EmailController } from './email.controller';
 
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: '192.168.1.121',
        port: 25,
        secure: false
      },
      defaults: {
        from: '"USDTL Iventory System" <admin@usdtl.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      }
    })
  ],
  providers: [EmailService],
  exports: [EmailService],
  controllers: [EmailController]
})
export class EmailModule {}
