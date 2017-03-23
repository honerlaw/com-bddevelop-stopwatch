import {Store, createStore, Action} from "redux";
import StopwatchData from "./stopwatch-data";
import {Dispatch} from "react-redux";
import {AsyncStorage} from "react-native";

export interface IStoreDispatch {
    setStopwatches: (stopwatches: StopwatchData[]) => void;
    setForce: (force: number) => void;
}

export interface IStoreState {
    stopwatches: StopwatchData[];
    force: number;
}

enum ActionType {
    STOPWATCHES,
    FORCE
}

interface IStopwatchAction extends Action {
    stopwatches: StopwatchData[];
}

interface IForceAction extends Action {
    force: number;
}

type StoreAction = IStopwatchAction | IForceAction | Action;

const STOPWATCH_KEY: string = "stopwatches";

AsyncStorage.getItem(STOPWATCH_KEY).then((data) => {
    const stopwatches: StopwatchData[] = JSON.parse(data);
    if (stopwatches === null || stopwatches.length === 0) {
        throw Error("no saved stopwatches found.");
    } else {
        // convert the object to an instance of a class
        for (let i = 0; i < stopwatches.length; ++i) {
            stopwatches[ i ] = Object.assign(new StopwatchData((stopwatches[ i ] as any).title), stopwatches[ i ]);
        }
        setStopwatches(stopwatches);
    }
}).catch(() => {
    setStopwatches([ new StopwatchData("Stopwatch 0") ]);
});

function save(stopwatches: StopwatchData[]): void {
    const data: string = JSON.stringify(stopwatches);
    AsyncStorage.setItem(STOPWATCH_KEY, JSON.stringify(stopwatches));
}

const INITIAL_STATE: IStoreState = {
    stopwatches: [],
    force: Math.random()
};

const reducer = (state: IStoreState = INITIAL_STATE, action: StoreAction) => {
    switch (action.type) {
        case ActionType.STOPWATCHES:
            const stopwatches: StopwatchData[] = (action as IStopwatchAction).stopwatches;
            save(stopwatches);
            return Object.assign({}, state, {
                stopwatches
            });
        case ActionType.FORCE:
            save(state.stopwatches);
            return Object.assign({}, state, {
                force: (action as IForceAction).force
            });
        default:
            return state;
    }
};

export const store: Store<IStoreState> = createStore<IStoreState>(reducer);

function set<S extends Action>(data: S, dispatch?: Dispatch<S>): void {
    if (dispatch) {
        dispatch(data);
    } else {
        store.dispatch(data);
    }
}

export function setStopwatches(stopwatches: StopwatchData[], dispatch?: Dispatch<IStopwatchAction>): void {
    stopwatches = stopwatches.slice();
    set<IStopwatchAction>({
        type: ActionType.STOPWATCHES,
        stopwatches
    }, dispatch);
}

export function setForce(force: number, dispatch?: Dispatch<IForceAction>): void {
    set<IForceAction>({
        type: ActionType.FORCE,
        force
    }, dispatch);
}

export function mapDispatchToProps<S extends Action>(dispatch: Dispatch<S>): IStoreDispatch {
    return {
        setStopwatches: (stopwatches: StopwatchData[]) => setStopwatches(stopwatches, dispatch),
        setForce: (force: number) => setForce(force, dispatch)
    };
}

export function mapStateToProps(state: IStoreState): IStoreState {
    return {
        stopwatches: state.stopwatches,
        force: state.force
    };
}

export function getState(): IStoreState {
    return store.getState();
}
