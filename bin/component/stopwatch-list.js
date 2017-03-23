import * as React from "react";
import * as ReactRedux from "react-redux";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Stopwatch from "./stopwatch";
import { mapStateToProps, mapDispatchToProps } from "../store";
import StopwatchData from "../stopwatch-data";
import { PRIMARY_COLOR } from "../util";
const STYLES = StyleSheet.create({
    container: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        padding: 10,
        borderRadius: 10
    },
    buttonText: {
        color: PRIMARY_COLOR
    }
});
class StopwatchList extends React.Component {
    add() {
        const stopwatches = this.props.stopwatches;
        stopwatches.push(new StopwatchData("Stopwatch " + stopwatches.length));
        this.props.setStopwatches(stopwatches);
    }
    render() {
        if (this.props.stopwatches.length === 0) {
            return React.createElement(View, { style: STYLES.buttonContainer },
                React.createElement(TouchableOpacity, { style: STYLES.button, onPress: this.add.bind(this) },
                    React.createElement(Text, { style: STYLES.buttonText }, "add stopwatch")));
        }
        return React.createElement(ScrollView, { style: STYLES.container }, this.props.stopwatches.map((stopwatch) => {
            return React.createElement(Stopwatch, { key: stopwatch.getKey(), stopwatch: stopwatch });
        }));
    }
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StopwatchList);
//# sourceMappingURL=stopwatch-list.js.map