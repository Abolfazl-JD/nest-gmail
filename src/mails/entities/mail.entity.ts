import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mails')
@ObjectType()
export class Mail {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number

  @Field()
  @Column()
  from: string

  @Field()
  @Column()
  to: string

  @Field()
  @Column()
  subject: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  body: string

  @Field()
  @CreateDateColumn()
  sentAt: Date

  @Field({ defaultValue: false })
  @Column({ default: false })
  archived: boolean

  @Field({ defaultValue: false })
  @Column({ default: false })
  read: boolean
}
