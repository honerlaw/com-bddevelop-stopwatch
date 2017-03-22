import * as React from "react";
import * as ReactRedux from "react-redux";
import {View, ViewStyle, Text, ScrollView, StyleSheet} from "react-native";
import {IStoreState, mapStateToProps} from "../store";
import StopwatchData from "../stopwatch-data";
import {getFormattedTime} from "../util";

interface IStyles {
    container: ViewStyle;
    row: ViewStyle;
    cell: ViewStyle;
}

const STYLES: IStyles = StyleSheet.create<IStyles>({
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

class Report extends React.Component<Partial<IStoreState>, void> {

    private getCell(content: string, key: number) {
        return <View key={ key } style={ STYLES.cell }>
            <Text>{ content }</Text>
        </View>;
    }

    public render(): React.ReactElement<View> {

        let largest: number = 0;
        this.props.stopwatches.forEach((stopwatch: StopwatchData) => {
            if (stopwatch.getLaps().length > largest) {
                largest = stopwatch.getLaps().length;
            }
        });

        const rows = [];

        for (let i = 0; i < largest; ++i) {
            const columns: string[] = [ "Lap " + (i + 1) ];
            this.props.stopwatches.forEach((stopwatch: StopwatchData) => {
                const laps: number[] = stopwatch.getLaps();
                if (i < laps.length) {
                    columns.push(getFormattedTime(laps[ i ]));
                } else {
                    columns.push(null);
                }
            });
            rows.push(columns);
        }

        // top row is the name of the stopwatchs
        // left side is lap number

        return <ScrollView style={ STYLES.container }
                           horizontal={ true }
                           directionalLockEnabled={ false }>

            <View style={ STYLES.row }>
                { this.getCell(null, -1) }
                { this.props.stopwatches.map((stopwatch: StopwatchData, index: number) => {
                    return this.getCell(stopwatch.getTitle(), index);
                }) }
            </View>

            { rows.map((columns: string[], index: number) => {
                return <View key={ index } style={ STYLES.row }>
                    { columns.map((column: string, i: number) => {
                        if (column == null) {
                            return this.getCell(null, i);
                        }
                        return this.getCell(column, i);
                    }) }
                </View>;
            }) }

        </ScrollView>;
    }

}

export default ReactRedux.connect<IStoreState, any, Partial<IStoreState>>(mapStateToProps)(Report);