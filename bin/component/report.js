import * as React from "react";
import * as ReactRedux from "react-redux";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { mapStateToProps } from "../store";
import { getFormattedTime, getHighestLapCount } from "../util";
const STYLES = StyleSheet.create({
    container: {
        flex: 1
    },
    column: {
        padding: 10,
        backgroundColor: "white"
    },
    cell: {
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    }
});
const getCell = (content, key) => {
    return React.createElement(View, { key: key, style: STYLES.cell },
        React.createElement(Text, null, content));
};
class Report extends React.Component {
    getColumns() {
        const highest = getHighestLapCount(this.props.stopwatches);
        const left = [getCell(null, -1)];
        for (let i = 0; i < highest; ++i) {
            left.push(getCell("Lap " + i, i));
        }
        const columns = [left];
        this.props.stopwatches.forEach((stopwatch, index) => {
            const rows = [getCell(stopwatch.getTitle(), index)];
            stopwatch.getLaps().forEach((lap) => {
                rows.push(getCell(getFormattedTime(lap), lap));
            });
            columns.push(rows);
        });
        return columns;
    }
    render() {
        return React.createElement(ScrollView, { style: STYLES.container, horizontal: true, directionalLockEnabled: false }, this.getColumns().map((rows, index) => {
            return React.createElement(View, { key: index, style: STYLES.column }, rows);
        }));
    }
}
export default ReactRedux.connect(mapStateToProps)(Report);
//# sourceMappingURL=report.js.map