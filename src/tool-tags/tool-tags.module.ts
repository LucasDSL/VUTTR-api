import { forwardRef, Module } from '@nestjs/common';
import { ToolTagsService } from './tool-tags.service';
import { ToolsModule } from 'src/tools/tools.module';
import { TagsModule } from 'src/tags/tags.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolTags } from './toolTags.entity';

@Module({
  imports: [
    forwardRef(() => ToolsModule),
    forwardRef(() => TagsModule),
    TypeOrmModule.forFeature([ToolTags]),
  ],
  providers: [ToolTagsService],
  exports: [ToolTagsService],
})
export class ToolTagsModule {}
