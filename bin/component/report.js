import * as React from "react";
import * as ReactRedux from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { mapStateToProps } from "../store";
import { getFormattedTime } from "../util";
const STYLES = StyleSheet.create({
    container: {
        flex: 1
    },
    row: {
        padding: 10,
        backgroundColor: "white"
    },
    cell: {
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    }
});
class Report extends React.Component {
    getCell(content, key) {
        return React.createElement(View, { key: key, style: STYLES.cell },
            React.createElement(Text, null, content));
    }
    render() {
        let largest = 0;
        this.props.stopwatches.forEach((stopwatch) => {
            if (stopwatch.getLaps().length > largest) {
                largest = stopwatch.getLaps().length;
            }
        });
        const rows = [];
        for (let i = 0; i < largest; ++i) {
            const columns = ["Lap " + (i + 1)];
            this.props.stopwatches.forEach((stopwatch) => {
                const laps = stopwatch.getLaps();
                if (i < laps.length) {
                    columns.push(getFormattedTime(laps[i]));
                }
                else {
                    columns.push(null);
                }
            });
            rows.push(columns);
        }
        // top row is the name of the stopwatchs
        // left side is lap number
        return React.createElement(ScrollView, { style: STYLES.container, horizontal: true, directionalLockEnabled: false },
            React.createElement(View, { style: STYLES.row },
                this.getCell(null, -1),
                this.props.stopwatches.map((stopwatch, index) => {
                    return this.getCell(stopwatch.getTitle(), index);
                })),
            rows.map((columns, index) => {
                return React.createElement(View, { key: index, style: STYLES.row }, columns.map((column, i) => {
                    if (column == null) {
                        return this.getCell(null, i);
                    }
                    return this.getCell(column, i);
                }));
            }));
    }
}
export default ReactRedux.connect(mapStateToProps)(Report);
//# sourceMappingURL=report.js.map