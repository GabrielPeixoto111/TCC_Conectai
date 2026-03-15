import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UpdateUserPatchDto } from './dto/updateuserpatch.dto';
import { UpdateUserPutDto } from './dto/updateuser.put.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<AuthResponseDto>;
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    updateUserPatch(id: string, updateUserDto: UpdateUserPatchDto): Promise<AuthResponseDto>;
    updateUserPut(id: string, updateUserPutDto: UpdateUserPutDto): Promise<AuthResponseDto>;
    deleteUser(id: string): Promise<void>;
    getProfile(req: any): Promise<any>;
}
