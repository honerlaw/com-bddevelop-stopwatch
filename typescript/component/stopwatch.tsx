import * as React from "react";
import * as ReactRedux from "react-redux";
import {View, ViewStyle, Text, TextStyle, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import StopwatchData from "../stopwatch-data";
import {mapStateToProps, mapDispatchToProps, IStoreState, IStoreDispatch} from "../store";
import {getFormattedTime} from "../util";

interface IStopwatchState {
    title: string;
    elapsed: number;
    interval: any;
}

interface IStopwatchProps extends Partial<IStoreState>, Partial<IStoreDispatch> {
    stopwatch: StopwatchData;
}

interface IStyle {
    container: ViewStyle;
    topContainer: ViewStyle;
    title: TextStyle;
    bottomContainer: ViewStyle;
    middleBigContainer: ViewStyle;
    middleContainer: ViewStyle;
    time: TextStyle;
    button: ViewStyle;
    buttonText: TextStyle;
    lap: TextStyle;
}

const STYLES = StyleSheet.create<IStyle>({
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
        fontFamily: "Courier New", // potentially need a different font for android,
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

class Stopwatch extends React.Component<IStopwatchProps, IStopwatchState> {

    private lastElapsedLapTime: number = 0;

    constructor(props: IStopwatchProps) {
        super(props);
        this.state = {
            title: props.stopwatch.getTitle(),
            elapsed: props.stopwatch.getElapsed(),
            interval: null
        };
    }

    private isRunning(): boolean {
        return this.state.interval !== null;
    }

    private restart(): void {
        if (this.isRunning()) {
            clearInterval(this.state.interval);
            this.setState({ interval: null });
        } else {
            const lastStart = new Date().getTime() - this.state.elapsed;
            const interval = setInterval(() => {
                const elapsed: number = new Date().getTime() - lastStart;
                this.props.stopwatch.setElapsed(elapsed);
                this.setState({ elapsed });
            }, 10);
            this.setState({ interval });
        }
    }

    private lapOrReset(): void {
        if (this.isRunning()) {
            const lap: number = this.state.elapsed - this.lastElapsedLapTime;
            this.lastElapsedLapTime = this.state.elapsed;
            this.props.stopwatch.lap(lap);
        } else {
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

    private remove(): void {
        const stopwatches: StopwatchData[] = this.props.stopwatches;
        const index: number = stopwatches.indexOf(this.props.stopwatch);
        stopwatches.splice(index, 1);
        this.props.setStopwatches(stopwatches.slice());
    }

    private setTitle(title: string): void {
        this.setState({ title });
        this.props.stopwatch.setTitle(title);
    }

    private getLastLapInfo(): React.ReactElement<Text> {
        const laps: number[] = this.props.stopwatch.getLaps();
        if (laps.length > 0) {
            return <Text style={ STYLES.lap }>
                { "Lap " + laps.length + ": " + getFormattedTime(laps[ laps.length - 1 ]) }
            </Text>;
        }
        return <Text style={ STYLES.lap }>no recorded laps</Text>;
    }

    public componentWillUnmount() {
        if (this.state.interval !== null) {
            clearInterval(this.state.interval);
        }
    }

    public render(): React.ReactElement<View> {
        return <View style={ STYLES.container }>
            <View style={ STYLES.topContainer }>
                <TextInput style={ STYLES.title }
                           value={ this.state.title }
                           onChangeText={ this.setTitle.bind(this) } />
                <TouchableOpacity style={ [STYLES.button, { borderWidth: 0 } as ViewStyle] }
                                  onPress={ this.remove.bind(this) }>
                    <Icon name="remove" size={ 15 } />
                </TouchableOpacity>
            </View>
            <View style={ STYLES.bottomContainer }>
                <View style={ STYLES.middleBigContainer }>
                    <Text style={ STYLES.time }>{ getFormattedTime(this.state.elapsed) }</Text>
                    { this.getLastLapInfo() }
                </View>
                <View style={ STYLES.middleContainer }>
                    <TouchableOpacity style={ STYLES.button } onPress={ this.lapOrReset.bind(this) }>
                        <Text style={ STYLES.buttonText }>{ this.isRunning() ? "lap" : "reset" }</Text>
                    </TouchableOpacity>
                </View>
                <View style={ STYLES.middleContainer }>
                    <TouchableOpacity style={ STYLES.button } onPress={ this.restart.bind(this) }>
                        <Text style={ STYLES.buttonText }>{ this.isRunning() ? "stop" : "start" }</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>;
    }

}

export default ReactRedux.connect<Partial<IStoreState>, Partial<IStoreDispatch>, IStopwatchProps>(
    mapStateToProps, mapDispatchToProps)(Stopwatch);
