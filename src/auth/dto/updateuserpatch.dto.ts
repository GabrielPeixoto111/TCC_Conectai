import {
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsString,
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserPatchDto {
  id: string;

  @ApiPropertyOptional({
    description: 'Email do usuário',
    example: 'joaoninguem@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Nome de usuário',
    example: 'joaoninguem',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username?: string;

  @ApiPropertyOptional({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  @IsOptional()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({
    description: 'Primeiro nome do usuário',
    example: 'João',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Sobrenome do usuário',
    example: 'Ninguém',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Biografia do usuário',
    example: 'Teste de patch do usuário do sistema.',
  })
  @IsOptional()
  @IsString()
  bio?: string;
}
