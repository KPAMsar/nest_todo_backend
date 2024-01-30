/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/user.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = await this.todoModel.create(createTodoDto);
    return createdTodo;
  }

  async getTodo(id: string): Promise<Todo> {
    return await this.todoModel.findById({ id });
  }

  async getAllTodo(): Promise<Todo[]> {
    try {
      const todos = await this.todoModel.find().exec();
      return todos;
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching todo data.');
    }
  }

  async deleteTodo(id: string): Promise<void> {
    const result = await this.todoModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      throw new Error(`Todo with ID ${id} not found.`);
    }
  }

  async updateTodo(id: string, updateTodoDto: CreateTodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(
      id,
      updateTodoDto,
      { new: true, useFindAndModify: false },
    );

    if (!updatedTodo) {
      throw new Error(`Todo with ID ${id} not found.`);
    }

    return updatedTodo;
  }
}
