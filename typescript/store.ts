import {Store, createStore, Action} from "redux";
import StopwatchData from "./stopwatch-data";
import {Dispatch} from "react-redux";

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

const INITIAL_STATE: IStoreState = {
    stopwatches: [ new StopwatchData("Stopwatch 0") ],
    force: Math.random()
};

const reducer = (state: IStoreState = INITIAL_STATE, action: StoreAction) => {
    switch (action.type) {
        case ActionType.STOPWATCHES:
            return Object.assign({}, state, {
                stopwatches: (action as IStopwatchAction).stopwatches
            });
        case ActionType.FORCE:
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
