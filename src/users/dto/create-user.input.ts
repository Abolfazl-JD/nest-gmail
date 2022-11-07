import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  
  @IsNotEmpty()
  @MinLength(1)
  @Field()
  username: string

  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @Field()
  password: string
}
