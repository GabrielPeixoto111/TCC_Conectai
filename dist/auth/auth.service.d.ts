import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UpdateUserPatchDto } from './dto/updateuserpatch.dto';
import { UpdateUserPutDto } from './dto/updateuser.put.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly SALT_ROUNDS;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    updateUserPatch(id: string, updateUserPatchDto: UpdateUserPatchDto): Promise<AuthResponseDto>;
    updateUserPut(id: string, updateUserPutDto: UpdateUserPutDto): Promise<AuthResponseDto>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    private generateToken;
    validateUser(userId: string): Promise<import("../users/entities/user.entity").User | null>;
}
