import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.tasksRepo.findOne({ where: { id }, relations: ['user'] });
  }

  create(taskData: Partial<Task>) {
    const task = this.tasksRepo.create(taskData);
    return this.tasksRepo.save(task);
  }

  async update(id: number, updateData: Partial<Task>) {
    await this.tasksRepo.update(id, updateData);
    return this.findOne(id);
  }

  async markAsDone(id: number) {
    const task = await this.findOne(id);
    if (task) {
      task.completedAt = new Date();
      return this.tasksRepo.save(task);
    }
    return null;
  }

  async markAsPending(id: number) {
    const task = await this.findOne(id);
    if (task) {
      task.completedAt = null;
      return this.tasksRepo.save(task);
    }
    return null;
  }

  remove(id: number) {
    return this.tasksRepo.delete(id);
  }
}
