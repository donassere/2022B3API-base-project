import { IsNotEmpty, IsOptional } from "class-validator";

export class ProjectDto {  
    @IsNotEmpty()  id: string;
    @IsNotEmpty()  name: string;
    @IsOptional()  description: string
    @IsNotEmpty()  referringEmployeeId: string
}