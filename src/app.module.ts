import { join, resolve } from 'path';
import databse_config from '@configs/mssql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './modules/test/test.module';
import { DbModule } from './db.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databse_config],
    }),
    TestModule,
    DbModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          dialect: 'mssql',
          host: configService.get('mssql.host'),
          port: configService.get('mssql.port'),
          username: configService.get('mssql.username'),
          password: configService.get('mssql.password'),
          database: configService.get('mssql.database'),
          timezone: '+08:00',
          pool: {
            max: 20,
            min: 5,
            acquire: 60000,
            idle: 10000,
          },
          modelPaths: [resolve(__dirname, './models', '**/!(index).{ts,js}')],
          retryAttempts: 3, // 数据链接重试次数
          retryDelay: 2000, // 连接重试尝试之间的延迟(ms)
          logQueryParameters: true,
          // logging: true,
          define: {
            hooks: {
              beforeCreate(attributes: any, options: any) {
                const { fields } = options;
                if (
                  !attributes.dataValues.created_by &&
                  fields.includes('created_by')
                ) {
                  // attributes.dataValues.created_by = 1;
                  throw new Error(`缺少created_by字段`);
                }
                if (
                  !attributes.dataValues.updated_by &&
                  fields.includes('updated_by')
                ) {
                  attributes.dataValues.updated_by =
                    attributes.dataValues.created_by;
                }
              },
              beforeBulkCreate(instances: any, options: any) {
                const { fields } = options;
                for (const instance of instances) {
                  if (
                    !instance.dataValues.created_by &&
                    fields.includes('created_by')
                  ) {
                    // instance.dataValues.created_by = 1;
                    throw new Error(`缺少created_by字段`);
                  }
                  if (
                    !instance.dataValues.updated_by &&
                    fields.includes('updated_by')
                  ) {
                    instance.dataValues.updated_by =
                      instance.dataValues.created_by;
                  }
                  // 注入app_id
                  // instance.dataValues.app_id = configService.get('app.app_id');
                }
              },
              beforeBulkDestroy(options: any) {
                if (!options.deleted_by) {
                  throw new Error(`缺少deleted_by字段`);
                }
              },
              beforeUpdate(instance: any, options: any) {
                const { fields } = options;
                if (
                  !instance.dataValues.updated_by &&
                  fields.includes('updated_by')
                ) {
                  throw new Error(`缺少updated_by字段`);
                }
                delete instance.dataValues.created_by;
              },
              beforeBulkUpdate(options: any) {
                const { attributes, fields } = options;
                if (!attributes.updated_by) {
                  throw new Error(`缺少updated_by字段`);
                }
                if (fields.includes('deleted_by')) {
                  delete attributes.updated_at;
                }
                delete attributes.created_by;
              },
              async afterBulkDestroy(options: any) {
                await options.model.update(
                  {
                    updated_by: options.deleted_by,
                    deleted_by: options.deleted_by,
                  },
                  {
                    where: options.where,
                    paranoid: false,
                    transaction: options.transaction,
                  },
                );
              },
            },
          },
          dialectOptions: {
            decimalNumbers: true,
            maxPreparedStatements: 100,
            multipleStatements: true,
            dateStrings: true,
            typeCast: function (field, next) {
              // for reading from database
              if (field.type === 'DATETIME') {
                return field.string();
              }
              return next();
            },
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
