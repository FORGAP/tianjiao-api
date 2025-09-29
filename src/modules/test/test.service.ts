import { TAdminUser } from '@models/index';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(TAdminUser)
    private readonly tUser: typeof TAdminUser,
  ) {}

  async getUsers() {
    const users = await this.tUser.findAll();
    return users;
  }
}
