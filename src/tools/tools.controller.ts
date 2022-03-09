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
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
  getTools(@Param('page') page?: number) {
    return this.toolsService.allTools(page);
  }
}
