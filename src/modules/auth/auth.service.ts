import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entities/user.entity'
import { UsersService } from '../users/users.service'
import { compareHash, hash } from 'lib/bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'
import { RequestWithUser } from 'interfaces/auth.interface'
import { NotesService } from '../notes/notes.service'
import { getEmailConfirmationEmail, getPasswordResetEmail } from 'lib/getEmailString'
import { EmailService } from 'modules/email/email.service'
import { ResetPasswordDto } from './dto/reset-password.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private notesService: NotesService,
    private emailService: EmailService,
  ) {}
  logger = new Logger(AuthService.name)

  async validateUser(email: string, password: string): Promise<User> {
    this.logger.log('Validating user...')
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      this.logger.log(`User with email ${email} does not exist!`)
      throw new BadRequestException('User with this email does not exist.')
    }
    const isPasswordValid = await compareHash(password, user.password)
    if (!isPasswordValid) {
      this.logger.log(`Invalid password for user with email ${email}!`)
      throw new UnauthorizedException('Invalid password')
    }

    if (!user.isEmailConfirmed) {
      this.logger.log(`User with email ${email} has not confirmed their email address yet!`)
      throw new UnauthorizedException('You need to verify your email before logging in!')
    }

    this.logger.log('User validated successfully')
    return user
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const token = registerUserDto.token

    const hashedPassword = await hash(registerUserDto.password)
    const user = await this.usersService.create({
      ...registerUserDto,
      password: hashedPassword,
    })

    // Send Email Confirmation
    const emailConfirmToken = this.jwtService.sign({ id: user.id }, { expiresIn: '1d' })
    const confirmLink = `${process.env.APP_URL}/confirm-email?token=${emailConfirmToken}`
    const emailContent = getEmailConfirmationEmail(confirmLink)
    await this.emailService.sendMail(user.email, 'Please confirm your email', emailContent)

    // Copy note to user if token is provided
    if (token) {
      try {
        // Verify and fetch share token
        const shareRecord = await this.notesService.getShareRecord(token)

        if (!shareRecord || shareRecord.expiry < new Date()) {
          throw new BadRequestException('Invalid or expired share token.')
        }

        const noteId = shareRecord.noteId
        await this.notesService.copyNoteToUser(noteId, user.id)

        // Delete share token after use
        await this.notesService.deleteShareRecord(token)

        this.logger.log(`Note ${noteId} copied to user ${user.id} upon registration.`)
      } catch (error) {
        this.logger.error(`Failed to copy note during registration: ${error.message}`)
        throw new BadRequestException('Invalid or expired share token.')
      }
    }

    return user
  }

  async generateJwt(user: User): Promise<string> {
    // return this.jwtService.signAsync({ sub: user.id, name: user.email })
    const payload = { id: user.id, email: user.email }
    return this.jwtService.signAsync(payload)
  }

  async user(cookie: string): Promise<User> {
    const data = await this.jwtService.verifyAsync(cookie)
    return this.usersService.findById(data['id'])
  }

  async getUserId(request: RequestWithUser): Promise<string> {
    const user = request.user as User
    return user.id
  }

  async validateUserById(id: string): Promise<User> {
    return this.usersService.findById(id)
  }

  async sendEmailConfirmation(email: string): Promise<void> {
    const user = await this.usersService.findBy({ email })

    if (!user) {
      // For security, you might want to pretend the email was sent
      throw new BadRequestException('User with this email does not exist.')
    }

    const emailConfirmToken = this.jwtService.sign({ id: user.id }, { expiresIn: '1d' })
    // const encodedToken = encodeURIComponent(emailConfirmToken)
    const confirmLink = `${process.env.APP_URL}/confirm-email?token=${emailConfirmToken}` //encodedToken

    const emailContent = getEmailConfirmationEmail(confirmLink)
    await this.emailService.sendMail(user.email, 'Please confirm your email', emailContent)
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.usersService.findBy({ email })

    if (!user) {
      // For security, you might want to pretend the email was sent
      throw new BadRequestException('User with this email does not exist.')
    }

    const resetToken = this.jwtService.sign({ id: user.id }, { expiresIn: '10m' })
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`

    const emailContent = getPasswordResetEmail(resetLink)
    await this.emailService.sendMail(user.email, 'Password Reset Request', emailContent)
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto

    try {
      const payload = await this.jwtService.verifyAsync(token)
      const user = await this.usersService.findById(payload.id)

      if (!user) {
        throw new BadRequestException('Invalid token')
      }

      user.password = await hash(newPassword)
      await this.usersService.update(user.id, user)
    } catch (error) {
      throw new BadRequestException('Invalid or expired token')
    }
  }
}
