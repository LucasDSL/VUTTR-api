import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ToolsModule } from './tools/tools.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Tool } from './tools/entities/tool.entity';
import { Tag } from './tools/entities/tag.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ToolsModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number.parseInt(process.env.DB_PORT),
      host: process.env.DB_HOST,
      synchronize: true,
      entities: [User, Tool, Tag],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
