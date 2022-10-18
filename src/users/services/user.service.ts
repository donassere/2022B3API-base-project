import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
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


  async findOne(options?: object): Promise<UserEntity> {
    return this.userRepo.findOne(options);      
  }

  
  async getUserId(id: string): Promise<UserEntity> {
    if (!isUUID(id)) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);    
    }
    const foundId = await this.userRepo.findOne({ where: { id: id, },
    });
    if (foundId === null ){
      throw new HttpException('User not found', HttpStatus.NOT_FOUND); 
    } 
    return foundId;
  }


  async create(userDto: CreateUserDto): Promise<UserEntity> {    
    const { username, password, email } = userDto;    
    const userInDb = await this.userRepo.findOne({ 
        where: { email } 
    });
    if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.INTERNAL_SERVER_ERROR);    
    }
    const user: UserEntity = await this.userRepo.create({ username, password, email });
    await this.userRepo.save(user);
    return user;  
  }


  async findAllUser(): Promise<UserEntity[]>{
    const users = await this.userRepo.find()
    console.table([users[0]])
    return this.userRepo.find()
  }
}