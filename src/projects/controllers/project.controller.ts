import { Body, Controller, Get, Param, Post, Query, UseGuards, Request, ValidationPipe, UsePipes } from '@nestjs/common';
import { OneToMany } from 'typeorm';
import { UsersService } from '../../users/services/user.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { ProjectService } from '../services/project.service';

@Controller('projects')
  export class ProjectController {
    constructor(
        private projectService: ProjectService,
        private usersService: UsersService,
    ) {}


  @Post('')
  create(@Body(new ValidationPipe({transform:true, whitelist: true})) project: CreateProjectDto){
    return this.projectService.create(project);
  }

  @Get('')
  getAllProject() {
    return this.projectService.getAllProject()
  }

//   @OneToMany()user{
//     user
//   }

}