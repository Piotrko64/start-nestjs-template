import {
  IsString,
  IsEmail,
  MinLength,
  IsStrongPassword,
  IsEnum,
} from 'class-validator';
// class-validator https://github.com/typestack/class-validator

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  @MinLength(8)
  password: string;

  @IsEnum(['ADMIN', 'USER'], {
    message: 'Valid role required',
  })
  role: string;
}

// class-transformer
