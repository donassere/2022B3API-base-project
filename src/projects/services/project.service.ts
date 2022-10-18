import { UsersService } from "../../users/services/user.service";
import { ProjectEntity } from "../entity/project.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';

@Injectable()
  export class ProjectService {
    private readonly project: CreateProjectDto[] = [];
    constructor(
        @InjectRepository(ProjectEntity)    
        private readonly projectRepo: Repository<ProjectEntity>,
    ) {}

  async create(projectDto: CreateProjectDto): Promise<ProjectEntity> {    
    const { name, description, referringEmployeeId } = projectDto;    
    const projectInDb = await this.projectRepo.findOne({ 
        where: { name } 
    });
    if (projectInDb) {
        throw new HttpException('Project already exists', HttpStatus.INTERNAL_SERVER_ERROR);    
    }
    const project: ProjectEntity = await this.projectRepo.create({ name, description, referringEmployeeId });
    await this.projectRepo.save(project);
    return project;  
  }


  async getAllProject(): Promise<ProjectEntity[]>{
    const projects = await this.projectRepo.find()
    console.table([projects[0]])
    return this.projectRepo.find()

  }
}