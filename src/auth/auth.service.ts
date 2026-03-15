import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { UpdateUserPatchDto } from './dto/updateuserpatch.dto';
import { UpdateUserPutDto } from './dto/updateuser.put.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      this.SALT_ROUNDS,
    );

    // Criar usuário com a senha criptografada
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Gerar token JWT
    const access_token = this.generateToken(user);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // Validar senha
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuário foi desativado');
    }

    // Gerar token JWT
    const access_token = this.generateToken(user);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        bio: user.bio,
      },
    };
  }

  async updateUserPatch(
    id: string,
    updateUserPatchDto: UpdateUserPatchDto,
  ): Promise<AuthResponseDto> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    // Se estiver atualizando senha, precisa criptografar
    if (updateUserPatchDto.password) {
      updateUserPatchDto.password = await bcrypt.hash(
        updateUserPatchDto.password,
        this.SALT_ROUNDS,
      );
    }

    const updatedUser = await this.usersService.update(id, updateUserPatchDto);

    const access_token = this.generateToken(updatedUser);

    return {
      access_token,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        bio: updatedUser.bio,
      },
    };
  }

  async updateUserPut(
    id: string,
    updateUserPutDto: UpdateUserPutDto,
  ): Promise<AuthResponseDto> {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (updateUserPutDto.password) {
      updateUserPutDto.password = await bcrypt.hash(
        updateUserPutDto.password,
        this.SALT_ROUNDS,
      );
    }

    const updatedUser = await this.usersService.update(id, updateUserPutDto);

    const access_token = this.generateToken(user);

    return {
      access_token,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        bio: updatedUser.bio,
      },
    };
  }

  async deleteUser(id: string) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado');
    }

    await this.usersService.delete(id);

    return {
      message: 'Usuário deletado com sucesso',
    };
  }

  private generateToken(user: any): string {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '24h',
    });
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }
}
