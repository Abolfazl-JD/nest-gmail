import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsResolver } from './mails.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ Mail ])
  ],
  providers: [MailsResolver, MailsService]
})
export class MailsModule {}
