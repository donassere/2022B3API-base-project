import { UsersService } from "../../users/services/user.service";
import { ProjectEntity } from "../entity/project.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UserDto } from "../../users/dto/user.dto";

@Injectable()
  export class ProjectService {
    private readonly project: CreateProjectDto[] = [];
    constructor(
        @InjectRepository(ProjectEntity)    
        private readonly projectRepo: Repository<ProjectEntity>,
    ) {}

    GetAllProjects(): Promise<ProjectEntity[]> {
      return this.projectRepo.find();
  }

  GetAllMySelf(): Promise<ProjectEntity[]> {
      return this.projectRepo.find();
  }

  GetOneUserProjects(id: string): Promise<ProjectEntity[]> {
      return this.projectRepo.find({ where: {referringEmployeeId: id} });
  }

  Create(project: CreateProjectDto): Promise<ProjectEntity> {
      const newProject = this.projectRepo.create(project);
      return this.projectRepo.save(newProject);
  }

  FindOneProject(id: string): Promise<ProjectEntity> {
      return this.projectRepo.findOne({ where: {id: id} });
  }

  FindProjectForCSV(id: string): Promise<ProjectEntity> {
      return this.projectRepo.findOne({ where: {referringEmployeeId: id} });
  }

  async CheckManager(projectId: string, userId: string): Promise<ProjectEntity> {
      return await this.projectRepo.findOne({ where: {id: projectId, referringEmployeeId: userId} });
  }
}