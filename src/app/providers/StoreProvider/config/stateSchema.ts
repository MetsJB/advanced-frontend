import {  CounterSchema } from "entites/Counter";
import {  UserSchema } from "entites/User";
import { LoginSchema } from "features/AuthByUsername";

export interface StateScheme {
  counter: CounterSchema;
  user: UserSchema
  loginForm?: LoginSchema
}
