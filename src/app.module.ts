import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ToolsModule } from './tools/tools.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { Tool } from './tools/tool.entity';
import { Tag } from './tags/tag.entity';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { ToolTags } from './tool-tags/toolTags.entity';
import { ToolTagsModule } from './tool-tags/tool-tags.module';

@Module({
  imports: [
    ToolsModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      entities: [User, Tool],
    }),
    TagsModule,
    ToolTagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
