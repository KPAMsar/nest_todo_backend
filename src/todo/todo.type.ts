/* eslint-disable prettier/prettier */
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Todo')
export class TodoType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => ID)
  id: string;
  @Field()
  task!: string;

  @Field()
  status!: string;
}
