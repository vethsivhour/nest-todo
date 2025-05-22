import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() createTaskDto: Partial<Task>) {
    return this.tasksService.create(createTaskDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: Partial<Task>) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Patch(':id/done')
  markAsDone(@Param('id') id: string) {
    return this.tasksService.markAsDone(+id);
  }

  @Patch(':id/pending')
  markAsPending(@Param('id') id: string) {
    return this.tasksService.markAsPending(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
