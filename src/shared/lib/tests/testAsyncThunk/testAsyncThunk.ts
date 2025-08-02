import { AsyncThunkAction } from "@reduxjs/toolkit";
import { StateScheme } from "app/providers/StoreProvider";
import { User } from "entites/User";

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg)=>AsyncThunkAction<
  Return,
  Arg,
  { rejectValue: RejectedValue }
>;

export class TestAsyncThunk<Return, Arg, Rejected> {
  dispatch: jest.MockedFn<any>;
  getState: () => StateScheme;
  actionCreator: ActionCreatorType<Return, Arg, Rejected>;

  constructor(actionCreator: ActionCreatorType<Return, Arg, Rejected>) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, undefined);

    return result 
  }
}
