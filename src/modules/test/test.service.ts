import { TUser } from '@models/index';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(TUser)
    private readonly tUser: typeof TUser,
  ) {}

  async getUsers() {
    const users = await this.tUser.findAll();
    return users;
  }
}
