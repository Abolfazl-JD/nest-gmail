import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMailInput } from './dto/create-mail.input';
import { UpdateMailInput } from './dto/update-mail.input';
import { Mail } from './entities/mail.entity';
import { UsersService } from './../users/users.service';

@Injectable()
export class MailsService {

  constructor(
    @InjectRepository(Mail) private mailsRepository: Repository<Mail>,
    private usersService: UsersService
  ) { }

  async create(createMailInput: CreateMailInput, userEmail: string) {
    const newMail = this.mailsRepository.create(createMailInput)
    newMail.from = userEmail
    return this.mailsRepository.save(newMail)
  }

  async findAll(userEmail: string) {
    return this.mailsRepository.findBy({ from: userEmail })
  }

  async findOne(id: number) {
    const mail = await this.mailsRepository.findOneBy({ id })
    if (!mail) throw new NotFoundException('the message was not found')
    return mail
  }

  async checkTheEmail(email: string) {
    const user = await this.usersService.findUserByEmail(email)
    return user ? true : false
  }

  async update(updateMailInput: UpdateMailInput, userEmail: string) {
    const mail = await this.findOne(updateMailInput.id)
    if(mail.from !== userEmail) throw new ForbiddenException('You can not edit somone else\'s mail ')
    return this.mailsRepository.save({...mail, ...updateMailInput})
  }

  async remove(id: number, userEmail: string) {
    const mail = await this.findOne(id)
    if(mail.from !== userEmail) throw new ForbiddenException('You can not delete somone else\'s mail ')
    await this.mailsRepository.remove(mail)
    return 'the mail was successfully deleted'
  }
}
