import { Module, Global } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import {
  TAdminOrg,
  TAdminUser,
  TAdminUserCustomAttribute,
  TSapPart,
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
      TAdminOrg,
      TAdminUser,
      TAdminUserCustomAttribute,
      TSapPart,
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
