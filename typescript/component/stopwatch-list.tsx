import * as React from "react";
import * as ReactRedux from "react-redux";
import {ScrollView, View, ViewStyle, StyleSheet, Text, TextStyle, TouchableOpacity} from "react-native";
import {ISceneProps} from "../props";
import Stopwatch from "./stopwatch";
import {IStoreState, mapStateToProps, IStoreDispatch, mapDispatchToProps} from "../store";
import StopwatchData from "../stopwatch-data";
import {PRIMARY_COLOR} from "../util";

interface IStopwatchListProps extends ISceneProps, Partial<IStoreState>, Partial<IStoreDispatch> {

}

interface IStyles {
    container: ViewStyle;
    buttonContainer: ViewStyle;
    button: ViewStyle;
    buttonText: TextStyle;
}

const STYLES: IStyles = StyleSheet.create<IStyles>({
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

class StopwatchList extends React.Component<IStopwatchListProps, void> {

    private add(): void {
        const stopwatches: StopwatchData[] = this.props.stopwatches;
        stopwatches.push(new StopwatchData("Stopwatch " + stopwatches.length));
        this.props.setStopwatches(stopwatches);
    }

    public render(): React.ReactElement<ScrollView> {
        if (this.props.stopwatches.length === 0) {
            return <View style={ STYLES.buttonContainer }>
                    <TouchableOpacity style={ STYLES.button } onPress={ this.add.bind(this) }>
                    <Text style={ STYLES.buttonText }>add stopwatch</Text>
                </TouchableOpacity>
            </View>;
        }
        return <ScrollView style={ STYLES.container }>
            { this.props.stopwatches.map((stopwatch: StopwatchData) => {
                return <Stopwatch key={ stopwatch.getKey() } stopwatch={ stopwatch } />;
            }) }
        </ScrollView>;
    }

}

export default ReactRedux.connect<Partial<IStoreState>, Partial<IStoreDispatch>, IStopwatchListProps>(
    mapStateToProps, mapDispatchToProps)(StopwatchList);
