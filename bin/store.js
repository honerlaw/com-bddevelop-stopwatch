import { createStore } from "redux";
var ActionType;
(function (ActionType) {
    ActionType[ActionType["STOPWATCHES"] = 0] = "STOPWATCHES";
})(ActionType || (ActionType = {}));
const INITIAL_STATE = {
    stopwatches: []
};
const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionType.STOPWATCHES:
            return Object.assign({}, state, {
                stopwatches: action.stopwatches
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
    set({
        type: ActionType.STOPWATCHES,
        stopwatches
    }, dispatch);
}
export function mapDispatchToProps(dispatch) {
    return {
        setStopwatches: (stopwatches) => setStopwatches(stopwatches, dispatch)
    };
}
export function mapStateToProps(state) {
    return {
        stopwatches: state.stopwatches
    };
}
export function getState() {
    return store.getState();
}
//# sourceMappingURL=store.js.map