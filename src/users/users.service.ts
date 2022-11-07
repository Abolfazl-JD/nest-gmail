import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { genSalt, hash, compare } from 'bcrypt'
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>){}

  async create(userInfo: CreateUserInput): Promise<User> {
    userInfo.password = await this.encryptPassword(userInfo.password)
    return this.usersRepository.save(userInfo)
  }

  async login(userInfo: LoginUserInput) {
    const { email, password } = userInfo
        if (!email || !password) throw new BadRequestException('Invalid credentials')
        
        const user = await this.usersRepository.findOneBy({ email })
        if (!user) throw new UnauthorizedException('there is no account with this gmail')
        
        await this.checkPassword(password, user.password)
        
        return user
  }

  findAll() {
    return this.usersRepository.find()
  }

  async updateUser(userId: number, userInfo: UpdateUserInput) {
    // find user by the given id
    const user = await this.getSingleUserById(userId)
    // if trying to edit password, check the old password is correct
    if (userInfo.oldPassword) {
        await this.checkPassword(userInfo.oldPassword, user.password)
        userInfo.password = await this.encryptPassword(userInfo.password)
    }
    // edit user
    return this.usersRepository.save({ ...user, ...userInfo })
  }

  async getSingleUserById(id: number) {
      const user = await this.usersRepository.findOneBy({ id })
      if (!user) throw new NotFoundException('user not found')
      return user
  }
  
  findUserByEmail(email: string) {
    return this.usersRepository.findOneBy({ email })
  }

  async encryptPassword(password: string) {
    const salt = await genSalt(10)
    return hash(password, salt)
  }

  async checkPassword(passToCheck: string, encryptedPass: string) {
    const isPasswordCorrect = await compare(passToCheck, encryptedPass)
    if(!isPasswordCorrect) throw new UnauthorizedException('password incorrect')
}
}
