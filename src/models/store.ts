import { Subscription } from 'rxjs';
import { Action } from './../interfaces/action';
import { BehaviorSubject } from 'rxjs';

export class Store<T> {
  private state: BehaviorSubject<T>;
  private reducer: (state: T, action: Action) => T;

  constructor(initialState: T, reducer: (state: T, action: Action) => T) {
    this.state = new BehaviorSubject(initialState);
    this.reducer = reducer
  }

  subscribe(callback: (state: T) => void): Subscription {
    return this.state.subscribe(callback);
  }
}