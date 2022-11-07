import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { MailsService } from './mails.service';
import { Mail } from './entities/mail.entity';
import { CreateMailInput } from './dto/create-mail.input';
import { UpdateMailInput } from './dto/update-mail.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './../guards/auth.guard';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@UseGuards(AuthGuard)
@Resolver(() => Mail)
export class MailsResolver {
  constructor(private readonly mailsService: MailsService) {}

  @Mutation(() => Mail)
  createMail(@Args('createMailInput') createMailInput: CreateMailInput, @CurrentUser() user: User) {
    return this.mailsService.create(createMailInput, user.email);
  }

  @Mutation(() => Boolean)
  checkEmailExistance(@Args('email') email: string) {
    return this.mailsService.checkTheEmail(email)
  }

  @Query(() => [Mail], { name: 'mails' })
  findAll(@CurrentUser() user: User) {
    return this.mailsService.findAll(user.email);
  }

  @Query(() => Mail, { name: 'mail' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.mailsService.findOne(id);
  }

  @Mutation(() => Mail)
  updateMail(@Args('updateMailInput') updateMailInput: UpdateMailInput, @CurrentUser() user: User) {
    return this.mailsService.update(updateMailInput, user.email);
  }

  @Mutation(() => String)
  removeMail(@Args('id', { type: () => Int }) id: number, @CurrentUser() user: User) {
    return this.mailsService.remove(id, user.email);
  }
}
