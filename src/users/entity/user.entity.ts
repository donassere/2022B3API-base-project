import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ProjectEntity } from "../../projects/entity/project.entity";

@Entity('user')
export class UserEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ 
        type: 'varchar', 
        nullable: false, 
        unique: true 
    }) 
    username: string;
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    password: string;

    @Column('varchar', { nullable:true, default: "Employee" })
    role?: 'Employee'| 'Admin' | 'ProjectManager';
    
    @Column({ 
        type: 'varchar', 
        nullable: false 
    }) 
    email: string;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    

}

