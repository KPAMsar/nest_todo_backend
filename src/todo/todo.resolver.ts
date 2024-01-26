/* eslint-disable prettier/prettier */
import { Query, Resolver } from '@nestjs/graphql';
import { TodoType } from './todo.type';

@Resolver((of) => TodoType)
export class TodoResolver {
  @Query((returns) => TodoType)
  todo() {
    return {
      task: 'Clean up',
      status: 'Pending',
    };
  }
}
