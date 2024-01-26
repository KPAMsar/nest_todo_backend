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

  @Mutation((returns) => TodoType)
  createTodo(@Args('task') task: string, @Args('status') status: string) {
    const createTodoDto: CreateTodoDto = { task, status };
    return this.todoService.create(createTodoDto);
  }
}
