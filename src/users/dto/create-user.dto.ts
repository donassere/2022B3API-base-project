export class User {
    public id!: string; 
    public username!: string; 
    public email!: string; 
    public password!: string;
    public role!: 'Employee' | 'Admin' | 'ProjectManager' 
  }