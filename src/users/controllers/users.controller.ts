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
    
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAllUser() {
    return this.userService.findAllUser();
  }

  @Post('/auth/sign-up')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) user: CreateUserDto){
    return this.userService.create(user);
  }

  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  @Post('/auth/login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getProfile(@Request() req) {
    console.log(req.user)
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUserId(@Param('id')id: string){
    return this.userService.getUserId(id);
  }

  
}