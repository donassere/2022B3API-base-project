import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "../../projects/entity/project.entity";
import { UserEntity } from "../../users/entity/user.entity";


@Entity()
export class ProjectUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false})
    startDate: Date;

    @Column({ nullable: false})
    endDate: Date;

    @Column({ type:"uuid", nullable: false})
    projectId: string;

    @Column({ type:"uuid", nullable: false})
    userId: string;

}