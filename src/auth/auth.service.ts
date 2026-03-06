import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);

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
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }

    // Validar senha
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

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
      },
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
