/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoType } from './todo.type';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Resolver((of) => TodoType)
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query((returns) => TodoType)
  todo(@Args('id') id: string) {
    return this.todoService.getTodo(id);
  }

  @Query((returns) => [TodoType])
  async allTodo(): Promise<any[]> {
    try {
      const data = await this.todoService.getAllTodo();
      return data;
      console.log('data', data);
    } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching todo data.');
    }
  }

  @Mutation((returns) => TodoType)
  createTodo(@Args('task') task: string, @Args('status') status: string) {
    const createTodoDto: CreateTodoDto = { task, status };
    const createdTodo = this.todoService.create(createTodoDto);
    return { success: true };
  }

  @Mutation((returns) => TodoType)
  async updateTodo(
    @Args('id') id: string,
    @Args('task') task: string,
    @Args('status') status: string,
  ): Promise<any> {
    console.log('Updating Todo with ID:', id);

    const updateTodoDto: CreateTodoDto = { task, status };
    const updatedTodo = await this.todoService.updateTodo(id, updateTodoDto);

    if (!updatedTodo) {
      throw new Error(`Todo with ID ${id} not found.`);
    }

    console.log('Updated Todo:', updatedTodo);
    return updatedTodo;
  }

  @Mutation((returns) => TodoType)
  async deleteTodo(@Args('id') id: string): Promise<any> {
    const deletedTodo = await this.todoService.deleteTodo(id);

    if (deletedTodo === undefined) {
      throw new Error(`Todo with ID ${id} not found.`);
    }
    console.log('deletted', deletedTodo);
    return deletedTodo;
  }
}
