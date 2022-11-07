import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { SessionEntity } from './session.entity';
import { MailsModule } from './mails/mails.module';
import { Mail } from './mails/entities/mail.entity';

@Module({
  imports: [
    UsersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      }
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ User, SessionEntity, Mail ],
      synchronize: true
    }),
    MailsModule
  ]
})
export class AppModule {}