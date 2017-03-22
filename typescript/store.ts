import {Store, createStore, Action} from "redux";
import StopwatchData from "./stopwatch-data";
import {Dispatch} from "react-redux";

export interface IStoreDispatch {
    setStopwatches: (stopwatches: StopwatchData[]) => void;
}

export interface IStoreState {
    stopwatches: StopwatchData[];
}

enum ActionType {
    STOPWATCHES
}

interface IStopwatchAction extends Action {
    stopwatches: StopwatchData[];
}

type StoreAction = IStopwatchAction | Action;

const INITIAL_STATE: IStoreState = {
    stopwatches: []
};

const reducer = (state: IStoreState = INITIAL_STATE, action: StoreAction) => {
    switch (action.type) {
        case ActionType.STOPWATCHES:
            return Object.assign({}, state, {
                stopwatches: (action as IStopwatchAction).stopwatches
            });
        default:
            return state;
    }
};

export const store: Store<IStoreState> = createStore<IStoreState>(reducer);

function set<S extends Action>(data: S, dispatch?: Dispatch<S>) {
    if (dispatch) {
        dispatch(data);
    } else {
        store.dispatch(data);
    }
}

export function setStopwatches(stopwatches: StopwatchData[], dispatch?: Dispatch<IStopwatchAction>) {
    set({
        type: ActionType.STOPWATCHES,
        stopwatches
    }, dispatch);
}

export function mapDispatchToProps<S extends Action>(dispatch: Dispatch<S>): IStoreDispatch {
    return {
        setStopwatches: (stopwatches: StopwatchData[]) => setStopwatches(stopwatches, dispatch)
    };
}

export function mapStateToProps(state: IStoreState): IStoreState {
    return {
        stopwatches: state.stopwatches
    };
}

export function getState(): IStoreState {
    return store.getState();
}
