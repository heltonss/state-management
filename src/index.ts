import { Action } from './interfaces/action';
import { Store } from './lib/store';

interface State {
  points: number;
  team: string;
}

const reducer = (state:State, action:Action):State => {
  switch (action.type) {
    case "CHANGE_TEAM": {
      return {...state, team: action.payload}
    }
    case "INCREMENT": {
      return {...state, points: state.points + action.payload}
    }
    default:
      return state
  }
}

const initialState: State = {
  team: "",
  points: 0
}

const store = new Store(initialState, reducer);
store.select("team").subscribe(name => console.log("team TEAMd changed",  name));
store.select("points").subscribe(points => console.log("team TEAMd changed",  points));

store.asyncDispatch("CHANGE_TEAM", () => new Promise(resolve => setTimeout(() => resolve(2),50000)))
store.dispatch({ type: "CHANGE_TEAM", payload: "First TEAM" });
store.dispatch({ type: "INCREMENT", payload: 5 });
store.dispatch({ type: "CHANGE_TEAM", payload: "Second TEAM" });
store.dispatch({ type: "INCREMENT", payload: 3 });
