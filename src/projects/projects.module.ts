import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProjectsController } from './controllers/project.controller';
import { ProjectEntity } from './entity/project.entity';
import { ProjectService } from './services/project.service';


@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity]), forwardRef(()=>AuthModule)],
    controllers: [ProjectsController],
    providers: [ProjectService],
    exports: [ProjectService],
  })

export class ProjectsModule {}