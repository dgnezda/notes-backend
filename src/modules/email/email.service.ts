import { Injectable, Logger } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'
import { filter } from 'rxjs'

@Injectable()
export class EmailService {
  private readonly logger: Logger = new Logger(EmailService.name)

  constructor(private readonly emailService: MailerService) {}

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    const from = process.env.SMTP_FROM_EMAIL
    try {
      await this.emailService.sendMail({
        to,
        from,
        subject,
        text: '',
        html,
        headers: {
          'X-SMTPAPI': JSON.stringify({
            filters: {
              clicktrack: {
                settings: {
                  enable: 0,
                },
              },
            },
          }),
        },
      })
      this.logger.log(`Email sent to ${to} with subject: ${subject}`)
    } catch (err) {
      this.logger.error(`Failed to send email to ${to} with subject: ${subject}`, err.stack)
    }
  }
}
