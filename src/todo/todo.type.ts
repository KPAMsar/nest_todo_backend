/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoType {
  @Field()
  task: string;

  @Field()
  status: string;
}
