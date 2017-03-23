import * as React from "react";
import * as ReactRedux from "react-redux";
import {View, ViewStyle, Text, ScrollView, StyleSheet} from "react-native";
import {IStoreState, mapStateToProps} from "../store";
import StopwatchData from "../stopwatch-data";
import {getFormattedTime, getHighestLapCount} from "../util";

interface IStyles {
    container: ViewStyle;
    column: ViewStyle;
    cell: ViewStyle;
}

const STYLES: IStyles = StyleSheet.create<IStyles>({
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

const getCell = (content: string, key: number): JSX.Element => {
    return <View key={ key } style={ STYLES.cell }>
        <Text>{ content }</Text>
    </View>;
};

class Report extends React.Component<Partial<IStoreState>, void> {

    private getColumns(): JSX.Element[][] {
        const highest: number = getHighestLapCount(this.props.stopwatches);

        const left: JSX.Element[] = [ getCell(null, -1) ];
        for (let i = 0; i < highest; ++i) {
            left.push(getCell("Lap " + i, i));
        }

        const columns: JSX.Element[][] = [ left ];
        this.props.stopwatches.forEach((stopwatch: StopwatchData, index: number) => {
            const rows: JSX.Element[] = [ getCell(stopwatch.getTitle(), index) ];
            stopwatch.getLaps().forEach((lap: number) => {
                rows.push(getCell(getFormattedTime(lap), lap));
            });
            columns.push(rows);
        });
        return columns;
    }

    public render(): React.ReactElement<View> {

        return <ScrollView style={ STYLES.container }
                           horizontal={ true }
                           directionalLockEnabled={ false }>
            { this.getColumns().map((rows, index: number) => {
                return <View key={ index } style={ STYLES.column }>
                    { rows }
                </View>;
            }) }
        </ScrollView>;
    }

}

export default ReactRedux.connect<IStoreState, any, Partial<IStoreState>>(mapStateToProps)(Report);
