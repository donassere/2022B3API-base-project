import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectUser } from './entity/project-user.entity';
import { ProjectUserService } from './services/project-users.service';
import { ProjectUserController } from './controllers/project-user.controllers';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { forwardRef } from '@nestjs/common/utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectUser]),
        forwardRef(() => UsersModule),
        forwardRef(() => ProjectsModule),
    ],
    controllers: [ProjectUserController],
    providers: [ProjectUserService],
    exports: [ProjectUserService],
})
export class ProjectUserModule {}