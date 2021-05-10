import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './user.entity'
import { CreateUserDto } from './user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(payload: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(payload)
    return this.userRepository.save(user)
  }

  findOne(uid: string): Promise<User> {
    return this.userRepository.findOne({
      where: { uid },
    })
  }

  list(): Promise<User[]> {
    return this.userRepository.find()
  }
}
