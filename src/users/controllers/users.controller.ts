import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/user.service';

@Controller()
export class UsersController {
    constructor(private userService: UsersService) {}

  @Get()
  getAll(): string {
    return this.userService.getHello();
  }
  //@Post('/auth/sign-up')
  

}