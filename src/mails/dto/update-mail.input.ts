import { CreateMailInput } from './create-mail.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class UpdateMailInput extends PartialType(CreateMailInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  subject: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  body: string

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  archived: boolean

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  read: boolean
}
