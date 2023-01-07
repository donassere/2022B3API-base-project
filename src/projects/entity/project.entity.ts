import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserDto } from "../../users/dto/user.dto";
import { UserEntity } from "../../users/entity/user.entity";

@Entity('project')
export class ProjectEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'varchar', 
        nullable: false, 
    }) 
    name: string;

    @Column({ 
      type: 'varchar', 
      nullable: false, 
  }) 
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.id)
      referringEmployeeId: string;
    
}