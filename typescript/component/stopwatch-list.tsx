import * as React from "react";
import * as ReactRedux from "react-redux";
import {ScrollView, ViewStyle, StyleSheet, Text} from "react-native";
import {ISceneProps} from "../props";
import Stopwatch from "./stopwatch";
import {IStoreState, mapStateToProps} from "../store";
import StopwatchData from "../stopwatch-data";

interface IStopwatchListProps extends ISceneProps, Partial<IStoreState> {

}

interface IStyles {
    container: ViewStyle;
}

const STYLES: IStyles = StyleSheet.create<IStyles>({
    container: {
        flex: 1
    }
});

class StopwatchList extends React.Component<IStopwatchListProps, void> {

    public render(): React.ReactElement<ScrollView> {
        return <ScrollView style={ STYLES.container }>
            { this.props.stopwatches.map((stopwatch: StopwatchData) => {
                return <Stopwatch key={ stopwatch.getKey() } stopwatch={ stopwatch } />;
            }) }
        </ScrollView>;
    }

}

export default ReactRedux.connect<Partial<IStoreState>, any, IStopwatchListProps>(mapStateToProps)(StopwatchList);
