import { Module, Global } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import {
  TUser,
  // TUserLogin,
  // TUserOplog,
  // TUserRight,
  // TUserRightRelation,
  // TUserRole,
  // TUserRoleRelation
} from '@models/index';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
      TUser,
      // TUserLogin,
      // TUserOplog,
      // TUserRight,
      // TUserRightRelation,
      // TUserRole,
      // TUserRoleRelation
    ]),
  ],
  exports: [SequelizeModule],
  controllers: [],
  providers: [],
})
export class DbModule {
  constructor() {}
}
