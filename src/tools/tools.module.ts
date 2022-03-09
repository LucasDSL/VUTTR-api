import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { Tool } from './tool.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { TagsModule } from 'src/tags/tags.module';
import { AuthModule } from 'src/auth/auth.module';
import { ToolTagsModule } from 'src/tool-tags/tool-tags.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tool]),
    UserModule,
    TagsModule,
    AuthModule,
    ToolTagsModule,
  ],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
