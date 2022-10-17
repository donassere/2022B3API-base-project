import { UserEntity } from "../entity/user.entity";
import { UserDto } from "./user.dto";

export const toUserDto = (data: UserEntity): UserDto => {  
    const { id, username, email, password } = data;
    let userDto: UserDto = { id, username, email, password};
    return userDto;
};