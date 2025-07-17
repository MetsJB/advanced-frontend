import {  CounterSchema } from "entites/Counter";
import {  UserSchema } from "entites/User";

export interface StateScheme {
  counter: CounterSchema;
  user: UserSchema
}
