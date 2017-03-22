import * as React from "react";
import * as ReactRedux from "react-redux";
import { ScrollView, StyleSheet } from "react-native";
import Stopwatch from "./stopwatch";
import { mapStateToProps } from "../store";
const STYLES = StyleSheet.create({
    container: {
        flex: 1
    }
});
class StopwatchList extends React.Component {
    render() {
        return React.createElement(ScrollView, { style: STYLES.container }, this.props.stopwatches.map((stopwatch) => {
            return React.createElement(Stopwatch, { key: stopwatch.getKey(), stopwatch: stopwatch });
        }));
    }
}
export default ReactRedux.connect(mapStateToProps)(StopwatchList);
//# sourceMappingURL=stopwatch-list.js.map