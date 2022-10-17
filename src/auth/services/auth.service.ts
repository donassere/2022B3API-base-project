import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus} from '@nestjs/common';
import { UserEntity } from '../../users/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.usersService.findOne({ where: { email }});
    console.log(user)
    const passwordValid = await bcrypt.compare(password, user.password)
    if (user && !passwordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    if (!user) return null;
  }


  async login(email:string, password:string) {
    const validatedUser = await this.validateUser(email, password)
    const payload = { email: validatedUser.email, sub: validatedUser.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}