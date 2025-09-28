import { NestFactory } from '@nestjs/core';
import { Sequelize } from 'sequelize';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

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
