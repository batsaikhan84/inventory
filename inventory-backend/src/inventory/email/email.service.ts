import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateSpecialRequestDto } from '../special-request/create-special-request.dto';
import { CreateEmailUserDto } from './create-email-user.dto';

@Injectable()
export class EmailService {
    constructor(private mailerService: MailerService) {}
    toStoreRoom = 'storeroom@usdtl.com'
    toStanze = 'stanze.boyland@usdtl.com'
    fromEmail = 'admin@usdtl.com'
    async sendStoreRoomSpecialRequest(User: CreateEmailUserDto, Items: CreateSpecialRequestDto[], Type: string) {
        await this.mailerService.sendMail({
            to: this.toStoreRoom,
            subject: `${Type} Special Order From ${User.department}`,
            template: __dirname + '/templates/sr-special-request-template',
            context: {
                Items: Items,
                Type: Type,
                User: User.name
            }
        })
    }
    async sendGeneralSpecialRequest(User: CreateEmailUserDto, Items: CreateSpecialRequestDto[], Type: string) {
        await this.mailerService.sendMail({
            to: this.toStanze,
            subject: `${Type} Special Order From ${User.department}`,
            template: __dirname + '/templates/special-request-template',
            context: {
                Items: Items,
                Type: Type,
                User: User.name
            }
        })
    }
    async sendScheduledEmail(items: any, department: string) {
        await this.mailerService.sendMail({
            to: this.toStanze,
            subject: `${department} Inventory Below Minimum Quantity`,
            template: __dirname + '/templates/scheduled-email-template',
            context: {
                items: items
            }
        })
    }
}

