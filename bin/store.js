import { createStore } from "redux";
import StopwatchData from "./stopwatch-data";
import { AsyncStorage } from "react-native";
var ActionType;
(function (ActionType) {
    ActionType[ActionType["STOPWATCHES"] = 0] = "STOPWATCHES";
    ActionType[ActionType["FORCE"] = 1] = "FORCE";
})(ActionType || (ActionType = {}));
const STOPWATCH_KEY = "stopwatches";
AsyncStorage.getItem(STOPWATCH_KEY).then((data) => {
    const stopwatches = JSON.parse(data);
    if (stopwatches === null || stopwatches.length === 0) {
        throw Error("no saved stopwatches found.");
    }
    else {
        // convert the object to an instance of a class
        for (let i = 0; i < stopwatches.length; ++i) {
            stopwatches[i] = Object.assign(new StopwatchData(stopwatches[i].title), stopwatches[i]);
        }
        setStopwatches(stopwatches);
    }
}).catch(() => {
    setStopwatches([new StopwatchData("Stopwatch 0")]);
});
function save(stopwatches) {
    const data = JSON.stringify(stopwatches);
    AsyncStorage.setItem(STOPWATCH_KEY, JSON.stringify(stopwatches));
}
const INITIAL_STATE = {
    stopwatches: [],
    force: Math.random()
};
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionType.STOPWATCHES:
            const stopwatches = action.stopwatches;
            save(stopwatches);
            return Object.assign({}, state, {
                stopwatches
            });
        case ActionType.FORCE:
            save(state.stopwatches);
            return Object.assign({}, state, {
                force: action.force
            });
        default:
            return state;
    }
};
export const store = createStore(reducer);
function set(data, dispatch) {
    if (dispatch) {
        dispatch(data);
    }
    else {
        store.dispatch(data);
    }
}
export function setStopwatches(stopwatches, dispatch) {
    stopwatches = stopwatches.slice();
    set({
        type: ActionType.STOPWATCHES,
        stopwatches
    }, dispatch);
}
export function setForce(force, dispatch) {
    set({
        type: ActionType.FORCE,
        force
    }, dispatch);
}
export function mapDispatchToProps(dispatch) {
    return {
        setStopwatches: (stopwatches) => setStopwatches(stopwatches, dispatch),
        setForce: (force) => setForce(force, dispatch)
    };
}
export function mapStateToProps(state) {
    return {
        stopwatches: state.stopwatches,
        force: state.force
    };
}
export function getState() {
    return store.getState();
}
//# sourceMappingURL=store.js.map