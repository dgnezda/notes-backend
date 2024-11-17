import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { User } from 'entities/user.entity'
import { Request } from 'express'
import { TokenPayload } from 'interfaces/auth.interface'
import { UsersService } from 'modules/users/users.service'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // constructor(private authService: AuthService) {
  //   super({
  //     jwtFromRequest: ExtractJwt.fromExtractors([
  //       (req: Request) => req.cookies['access_token'],
  //     ]),
  //     ignoreExpiration: false,
  //     secretOrKey: process.env.JWT_SECRET,
  //   });
  // }
  constructor(configService: ConfigService, private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies['access_token'];
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }


  // async validate(payload: any) {
  //   const user = await this.authService.validateUserById(payload.id);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid token');
  //   }
  //   return user;
  // }
  async validate(payload: any): Promise<User> {
    const user = await this.usersService.findBy({id: payload.id});
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
