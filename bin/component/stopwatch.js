import * as React from "react";
import * as ReactRedux from "react-redux";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { mapStateToProps, mapDispatchToProps } from "../store";
import { getFormattedTime } from "../util";
const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    topContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        flex: 10,
        margin: 10,
        height: 30,
        fontSize: 13
    },
    bottomContainer: {
        flex: 1,
        flexDirection: "row"
    },
    middleBigContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    middleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    time: {
        fontFamily: "Courier New",
        margin: 10,
        fontSize: 25
    },
    button: {
        borderWidth: 1,
        borderColor: "#95a5a6",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        borderRadius: 25,
        overflow: "hidden"
    },
    buttonText: {
        fontSize: 12
    },
    lap: {
        fontSize: 11,
        color: "#95a5a6"
    }
});
class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.lastElapsedLapTime = 0;
        this.state = {
            title: props.stopwatch.getTitle(),
            elapsed: props.stopwatch.getElapsed(),
            interval: null
        };
    }
    isRunning() {
        return this.state.interval !== null;
    }
    restart() {
        if (this.isRunning()) {
            clearInterval(this.state.interval);
            this.setState({ interval: null });
        }
        else {
            const lastStart = new Date().getTime() - this.state.elapsed;
            const interval = setInterval(() => {
                const elapsed = new Date().getTime() - lastStart;
                this.props.stopwatch.setElapsed(elapsed);
                this.setState({ elapsed });
            }, 10);
            this.setState({ interval });
        }
    }
    lapOrReset() {
        if (this.isRunning()) {
            const lap = this.state.elapsed - this.lastElapsedLapTime;
            this.lastElapsedLapTime = this.state.elapsed;
            this.props.stopwatch.lap(lap);
        }
        else {
            this.lastElapsedLapTime = 0;
            this.props.stopwatch.reset();
            this.setState({
                elapsed: 0,
                interval: null
            });
        }
        // this is a weird hack that should be removed in the future
        // it basically forces redux to notify that the state has changed because we use complex objects
        this.props.setForce(Math.random());
    }
    remove() {
        const stopwatches = this.props.stopwatches;
        const index = stopwatches.indexOf(this.props.stopwatch);
        stopwatches.splice(index, 1);
        this.props.setStopwatches(stopwatches.slice());
    }
    setTitle(title) {
        this.setState({ title });
        this.props.stopwatch.setTitle(title);
    }
    getLastLapInfo() {
        const laps = this.props.stopwatch.getLaps();
        if (laps.length > 0) {
            return React.createElement(Text, { style: STYLES.lap }, "Lap " + laps.length + ": " + getFormattedTime(laps[laps.length - 1]));
        }
        return React.createElement(Text, { style: STYLES.lap }, "no recorded laps");
    }
    componentWillUnmount() {
        if (this.state.interval !== null) {
            clearInterval(this.state.interval);
        }
    }
    render() {
        return React.createElement(View, { style: STYLES.container },
            React.createElement(View, { style: STYLES.topContainer },
                React.createElement(TextInput, { style: STYLES.title, value: this.state.title, onChangeText: this.setTitle.bind(this) }),
                React.createElement(TouchableOpacity, { style: [STYLES.button, { borderWidth: 0 }], onPress: this.remove.bind(this) },
                    React.createElement(Icon, { name: "remove", size: 15 }))),
            React.createElement(View, { style: STYLES.bottomContainer },
                React.createElement(View, { style: STYLES.middleBigContainer },
                    React.createElement(Text, { style: STYLES.time }, getFormattedTime(this.state.elapsed)),
                    this.getLastLapInfo()),
                React.createElement(View, { style: STYLES.middleContainer },
                    React.createElement(TouchableOpacity, { style: STYLES.button, onPress: this.lapOrReset.bind(this) },
                        React.createElement(Text, { style: STYLES.buttonText }, this.isRunning() ? "lap" : "reset"))),
                React.createElement(View, { style: STYLES.middleContainer },
                    React.createElement(TouchableOpacity, { style: STYLES.button, onPress: this.restart.bind(this) },
                        React.createElement(Text, { style: STYLES.buttonText }, this.isRunning() ? "stop" : "start")))));
    }
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Stopwatch);
//# sourceMappingURL=stopwatch.js.map