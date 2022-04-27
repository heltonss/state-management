import { distinctUntilChanged, distinctUntilKeyChanged, Observable, pluck, Subscription } from 'rxjs';
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

  dispatch = (action: Action): void => {
    const oldState = this.state.getValue();
    const newState = this.reducer(oldState, action);
    this.state.next(newState);
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this.state.pipe(
      distinctUntilKeyChanged(key),
      pluck(key)
    );
  }
}