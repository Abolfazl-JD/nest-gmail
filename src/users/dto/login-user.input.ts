import { Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

@InputType()
export class LoginUserInput {
  
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