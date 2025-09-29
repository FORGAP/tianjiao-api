import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  const config = app.get(ConfigService);
  // 配置 Swagger
  console.log(`config.get('app.node_env'): `, config.get('app.node_env'));
  if (
    config.get('app.node_env') === 'development' ||
    config.get('app.node_env') === 'test'
  ) {
    const options = new DocumentBuilder()
      .addBearerAuth() // 开启 BearerAuth 授权认证
      .setTitle(config.get('app.name'))
      .setDescription(config.get('app.desc'))
      .setVersion(config.get('app.version'))
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-doc', app, document);
  }
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`See Swagger Doc: ${await app.getUrl()}/api-doc`);

  // test mssql
  // const sequelize = new Sequelize({
  //   dialect: 'mssql',
  //   host: '192.168.8.150',
  //   port: 1433,
  //   username: 'sa',
  //   password: 'HappyWork@123',
  //   database: 'FAU_MAIN',
  //   dialectOptions: {
  //     multipleStatements: true,
  //   },
  // });
  // try {
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');
  // } catch (error) {
  //   console.error('Unable to connect to the database:', error);
  // }
}
bootstrap();
