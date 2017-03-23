import * as React from "react";
import * as ReactRedux from "react-redux";
import {
    View,
    Text,
    TextStyle,
    Navigator,
    Route,
    TouchableOpacity,
    ViewStyle,
    StyleSheet,
    StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import StopwatchList from "./component/stopwatch-list";
import Report from "./component/report";
import {mapStateToProps, IStoreState, IStoreDispatch, mapDispatchToProps} from "./store";
import StopwatchData from "./stopwatch-data";
import {getHighestLapCount, HEADER_COLOR} from "./util";

interface IAppProps extends IStoreState, IStoreDispatch {

}

interface IStyles {
    navbar: ViewStyle;
    navbarTitle: ViewStyle;
    navbarTitleText: TextStyle;
    scene: ViewStyle;
    button: ViewStyle;
    buttonText: TextStyle;
}

const STYLES: IStyles = StyleSheet.create<IStyles>({
    navbar: {
        backgroundColor: HEADER_COLOR,
        justifyContent: "center",
        alignItems: "center"
    },
    navbarTitle: {
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    navbarTitleText: {
        color: "white",
        fontSize: 18
    },
    scene: {
        flex: 1,
        marginTop: 64
    },
    button: {
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        paddingRight: 30,
        paddingLeft: 30,
        color: "white"
    }
});

const INITIAL_ROUTE: Route = {
    title: "stopwatch_list",
    index: 0
};

const report = (nav: Navigator) => {
    nav.push({
        title: "report"
    });
};

const getScene = (route: Route, navigator: Navigator) => {
    switch (route.title) {
        case "report":
            return <Report />;
        default:
            return <StopwatchList navigator={ navigator }/>;
    }
};

const renderScene = (route: Route, navigator: Navigator) => {
    return <View style={ { flex : 1 } }>
        <StatusBar barStyle="light-content"/>
        { getScene(route, navigator) }
    </View>;
};

const configureScene = (route: Route) => {
    switch (route.title) {
        case "report":
            return Navigator.SceneConfigs.FloatFromBottom;
        default:
            return Navigator.SceneConfigs.FloatFromRight;
    }
};

class App extends React.Component<IAppProps, void> {

    private routeMapper() {
        return {
            Title: (): JSX.Element => {
                return <View style={ STYLES.navbarTitle }>
                    <Text style={ STYLES.navbarTitleText }>stopwatch</Text>
                </View>;
            },
            LeftButton: (route: Route, nav: Navigator): JSX.Element => {
                if (route.title === "report") {
                    return <TouchableOpacity onPress={ () => nav.pop() } style={ STYLES.button }>
                        <Icon name="chevron-left" size={ 30 } style={ STYLES.buttonText }/>
                    </TouchableOpacity>;
                }
                if (this.props.stopwatches.length === 0 || getHighestLapCount(this.props.stopwatches) === 0) {
                    return null;
                }
                return <TouchableOpacity onPress={ () => report(nav) } style={ STYLES.button }>
                    <Icon name="assignment" size={ 20 } style={ STYLES.buttonText }/>
                </TouchableOpacity>;
            },
            RightButton: (route: Route): JSX.Element => {
                if (route.title === "report") {
                    return null;
                }
                return <TouchableOpacity onPress={ this.add.bind(this) } style={ STYLES.button }>
                    <Icon name="alarm-add" size={ 20 } style={ STYLES.buttonText }/>
                </TouchableOpacity>;
            }
        };
    }

    private add() {
        const stopwatches: StopwatchData[] = this.props.stopwatches;
        stopwatches.push(new StopwatchData("Stopwatch " + stopwatches.length));
        this.props.setStopwatches(stopwatches);
    }

    public render(): React.ReactElement<View> {
        return <Navigator
            navigationBar={ <Navigator.NavigationBar style={ STYLES.navbar } routeMapper={ this.routeMapper() } /> }
            initialRoute={ INITIAL_ROUTE }
            renderScene={ renderScene }
            configureScene={ configureScene }
            sceneStyle={ STYLES.scene }/>;
    }

}

export default ReactRedux.connect<IStoreState, IStoreDispatch, IAppProps>(mapStateToProps, mapDispatchToProps)(App);
