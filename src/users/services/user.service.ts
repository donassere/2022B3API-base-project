import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { query } from 'express';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { toUserDto } from '../dto/toUser.dto';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UsersService {
  private readonly users: CreateUserDto[] = [];

  constructor(
    @InjectRepository(UserEntity)    
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user =  await this.userRepo.findOne(options);    
    return toUserDto(user);  
  }

  async getUser({email, username, id}: UserDto): Promise<UserDto> {
    const found = await this.userRepo.findOne({ where:{ email, username, id }});
    return toUserDto(found);
  }
  
  async getUserEmail({email}: UserDto): Promise<UserDto> {
    const foundEmail = await this.userRepo.findOne({ where: { email }
    });
    if (!foundEmail) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
  } 
    return toUserDto(foundEmail);
  }

  async getUserId({id}: UserDto): Promise<UserDto> {
    const foundId = await this.userRepo.findOne({ where: { id }
    });
    if (!foundId) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
  } 
    return toUserDto(foundId);
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {    
    const { username, password, email } = userDto;
        
    const userInDb = await this.userRepo.findOne({ 
        where: { email } 
    });
    if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.INTERNAL_SERVER_ERROR);    
    }
    
    const user: UserEntity = await this.userRepo.create({ username, password, email });
    await this.userRepo.save(user);
    return toUserDto(user);  
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {    
    const user = await this.userRepo.findOne({ where: { email } });
    
    if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
    }  
    
    if (user.password != password) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    }
    
    return toUserDto(user);  
  }


  getHello(): string {
    return 'Hello';
  }

}