import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
  Query,
  BadRequestException,
  Logger,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Public } from 'decorators/public.decorator'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from 'entities/user.entity'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { RequestWithUser } from 'interfaces/auth.interface'
import { Request, Response } from 'express'
import { UsersService } from 'modules/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { getWelcomeEmail } from 'lib/getEmailString'
import { EmailService } from 'modules/email/email.service'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { ChangePasswordDto } from './dto/change-password.dto'

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  logger: Logger = new Logger(AuthController.name)
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  @ApiCreatedResponse({ description: 'Registers new user.' })
  @ApiBadRequestResponse({ description: 'Error for registering new user.' })
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body)
  }

  @ApiCreatedResponse({ description: 'Logs in user.' })
  @ApiBadRequestResponse({ description: 'Error for logging in a user.' })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response): Promise<User> {
    const access_token = await this.authService.generateJwt(req.user)
    res.cookie('access_token', access_token, { httpOnly: true })
    return req.user
  }

  @ApiCreatedResponse({ description: 'Returns authenticated/logged in user.' })
  @ApiBadRequestResponse({ description: 'Error for returning authenticated/logged in user.' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async user(@Req() req: Request): Promise<User> {
    const cookie = req.cookies['access_token']
    return this.authService.user(cookie)
  }

  @ApiCreatedResponse({ description: 'Signs out user.' })
  @ApiBadRequestResponse({ description: 'Error for signing out user.' })
  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signout(@Res({ passthrough: true }) res: Response): Promise<{ msg: string }> {
    res.clearCookie('access_token')
    return { msg: 'ok' }
  }

  @ApiCreatedResponse({ description: 'Requests email confirmation.' })
  @ApiBadRequestResponse({ description: 'Error requesting email confirmation.' })
  @Public()
  @Post('request-confirm-email')
  @HttpCode(HttpStatus.OK)
  async requestConfirmEmail(@Body('email') email: string): Promise<{ message: string }> {
    await this.authService.sendEmailConfirmation(email)
    return { message: 'Email confirmation sent.' }
  }

  @ApiCreatedResponse({ description: 'Confirms email.' })
  @ApiBadRequestResponse({ description: 'Error for confirming email.' })
  @Public()
  @Get('confirm-email')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Query('token') token: string): Promise<string> {
    this.logger.log(`Entered confirmEmail with token: ${token}`)
    try {
      const payload = await this.jwtService.verifyAsync(token)
      const user = await this.usersService.findById(payload.id)

      if (!user) {
        throw new BadRequestException('Invalid token')
      }
      await this.usersService.update(user.id, { isEmailConfirmed: true })

      const emailContent = getWelcomeEmail(user.firstName)
      await this.emailService.sendMail(user.email, 'Welcome to dotmd.ink!', emailContent)

      return 'Email confirmed successfully'
    } catch (error) {
      throw new BadRequestException('Invalid or expired token')
    }
  }

  @ApiCreatedResponse({ description: 'Requests password reset.' })
  @ApiBadRequestResponse({ description: 'Error requesting password reset.' })
  @Public()
  @Post('request-password-reset')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body('email') email: string): Promise<{ message: string }> {
    await this.authService.sendPasswordResetEmail(email)
    return { message: 'Password reset email sent.' }
  }

  @ApiCreatedResponse({ description: 'Resets password.' })
  @ApiBadRequestResponse({ description: 'Error resetting password.' })
  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    await this.authService.resetPassword(resetPasswordDto)
    return { message: 'Password has been reset successfully.' }
  }

  @ApiCreatedResponse({ description: 'Changes password.' })
  @ApiBadRequestResponse({ description: 'Error changing password.' })
  @Post('change-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() changePassowordDto: ChangePasswordDto): Promise<{ message: string }> {
    await this.authService.changePassword(changePassowordDto)
    return { message: 'Password has been changed successfully.' }
  }
}
