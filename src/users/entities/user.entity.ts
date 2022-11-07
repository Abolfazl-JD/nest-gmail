import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number
  
  @Column()
  @Field()
  username: string

  @Column({ unique: true })
  @Field()
  email: string

  @Column()
  @Field({ defaultValue: 'Not allowed' })
  password: string
}
