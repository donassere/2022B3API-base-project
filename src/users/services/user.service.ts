import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  createUser(user: User) {
    this.users.push(user);
  }
  getHello(): string {
    return 'Hello World!';
  }

}