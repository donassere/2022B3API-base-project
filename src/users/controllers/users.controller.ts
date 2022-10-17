import { Body, Controller, Get, Param, Post, Query, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guards';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { AuthService } from '../../auth/services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserDto } from '../dto/user.dto';
import { UsersService } from '../services/user.service';

@Controller('users')
export class UsersController {
    constructor(
      private userService: UsersService,
      private authService: AuthService
    ) {}
    

  @Get('/')
  getHello(@Query() query:{ name:string }): string {
    return this.userService.getHello()+ " " + `${query.name}`;
  }

  @Get('/me')
  getUserEmail(userDto: UserDto){
    return this.userService.getUserEmail(userDto);
  }

  @Post('/auth/sign-up')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) user: CreateUserDto){
    return this.userService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/auth/login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto.email, loginUserDto.password)
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  @Get('/users/{id}')
  getUserId(@Param('id') userDto: UserDto){
    return this.userService.getUserId(userDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/users')
  getProfile(@Request() req) {
    return req.user;
  }

}