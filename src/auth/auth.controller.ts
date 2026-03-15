import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  UseGuards,
  Request,
  Delete,
  Patch,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateUserPatchDto } from './dto/updateuserpatch.dto';
import { UpdateUserPutDto } from './dto/updateuser.put.dto';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registrar um novo usuário',
    description: 'Cria um novo usuário no sistema',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'Dados para registro de um novo usuário',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário registrado com sucesso',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de registro inválidos',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  ): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserPatch(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserPatchDto,
  ): Promise<AuthResponseDto> {
    return this.authService.updateUserPatch(id, updateUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserPut(
    @Param('id') id: string,
    @Body(ValidationPipe) updateUserPutDto: UpdateUserPutDto,
  ): Promise<AuthResponseDto> {
    return this.authService.updateUserPut(id, updateUserPutDto);
  }

  @ApiOperation({
    summary: 'Deletar um usuário',
    description: 'Remove um usuário do sistema pelo ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário a ser deletado',
    example: 'dd0b8eff-f03c-42b4-872c-128c0df5a3f7',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.authService.deleteUser(id);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    return req.user;
  }
}
