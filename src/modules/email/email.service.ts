import { Injectable, Logger } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class EmailService {
  constructor(private readonly emailService: MailerService) {}
  logger: Logger = new Logger()

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const from = process.env.FROM
    try {
      await this.emailService.sendMail({
        to,
        from,
        subject,
        text: '',
        html,
      })
    } catch (err) {
      this.logger.error(err)
    }
  }
}
