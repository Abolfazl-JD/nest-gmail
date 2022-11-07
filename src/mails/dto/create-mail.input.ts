import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateMailInput {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  to: string

  @IsNotEmpty()
  @Field()
  subject: string

  @Field({ nullable: true })
  @IsString()
  body: string
}
