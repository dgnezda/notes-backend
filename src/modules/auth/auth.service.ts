import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'entities/user.entity'
import { UsersService } from '../users/users.service'
import { compareHash, hash } from 'lib/bcrypt'
import { RegisterUserDto } from './dto/register-user.dto'
import { RequestWithUser } from 'interfaces/auth.interface'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  logger = new Logger('AuthService')

  async validateUser(email: string, password: string): Promise<User> {
    this.logger.log('Validating user...')
    const user = await this.usersService.findBy({ email: email })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await compareHash(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    this.logger.log('User validated successfully');
    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await hash(registerUserDto.password)
    return this.usersService.create({
      // role_id: null,
      ...registerUserDto,
      password: hashedPassword,
    })
  }

  async generateJwt(user: User): Promise<string> {
    // return this.jwtService.signAsync({ sub: user.id, name: user.email })
    const payload = { id: user.id, email: user.email };
    return this.jwtService.signAsync(payload);
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
    return this.usersService.findById(id);
  }
  
}
