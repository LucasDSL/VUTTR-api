import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createToolDto: CreateToolDto, @Request() req) {
    return this.toolsService.createTool(createToolDto, req.user);
  }

  @Get('/:page?')
  @HttpCode(HttpStatus.FOUND)
  getTools(@Param('page') page?: number, @Query('tag') tag?: string) {
    if (tag) {
      return this.toolsService.getByTag(tag);
    }
    return this.toolsService.allTools(page);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  deleteTool(@Param('id') id: string, @Request() req: any) {
    return this.toolsService.delete(id, req.user);
  }
}
