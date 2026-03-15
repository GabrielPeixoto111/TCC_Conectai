import {
  IsEmail,
  MinLength,
  MaxLength,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserPutDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Endereço de email',
    example: 'janeroe@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Nome de usuário',
    example: 'janeroe',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  username: string;

  @ApiProperty({
    description: 'Senha',
    example: 'chave123',
  })
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    description: 'Primeiro nome',
    example: 'Jane',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName: string;

  @ApiPropertyOptional({
    description: 'Sobrenome',
    example: 'Roe',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName: string;

  @ApiPropertyOptional({
    description: 'Biografia do usuário',
    example: 'Teste de put do usuário do sistema.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  bio: string;
}
