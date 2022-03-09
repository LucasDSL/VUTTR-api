import { IsArray, IsString } from 'class-validator';

export class CreateToolDto {
  @IsString()
  name: string;

  @IsString()
  link: string;

  @IsString()
  description: string;

  @IsArray()
  tags: string[];
}
