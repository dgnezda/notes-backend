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

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
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

  @Get('confirm-email')
  async confirmEmail(@Query('token') token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verifyAsync(token)
      const user = await this.usersService.findById(payload.id)
      if (!user) {
        throw new BadRequestException('Invalid token')
      }
      user.isEmailConfirmed = true
      await this.usersService.update(user.id, { isEmailConfirmed: true })
      return 'Email confirmed successfully'
    } catch (error) {
      throw new BadRequestException('Invalid or expired token')
    }
  }
}
