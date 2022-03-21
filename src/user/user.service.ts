import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async findOneById(userId: string) {
    return this.UserRepository.findOne({ id: userId });
  }

  findOneByUserName(username: string) {
    return this.UserRepository.findOne({ username: username });
  }

  create(createUserDto: CreateUserDto) {
    const newUser = this.UserRepository.create(createUserDto);
    return this.UserRepository.save(newUser);
  }

  getData(user: any) {
    return this.UserRepository.findOne({ id: user.userId });
  }
}
