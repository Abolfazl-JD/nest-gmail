import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator"

@InputType()
export class UpdateUserInput{

  @IsNotEmpty()
  @Field(() => Int)
  id: number

  @IsOptional()
  @MinLength(1)
  @Field({ nullable: true })
  username: string

  @IsOptional()
  @MinLength(8)
  @MaxLength(30)
  @Field({ nullable: true })
  password: string

  @IsOptional()
  @MinLength(8)
  @MaxLength(30)
  @Field({ nullable: true })
  oldPassword: string
}
