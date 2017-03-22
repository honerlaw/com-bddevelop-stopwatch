import * as React from "react";
import {
    View,
    Text,
    TextStyle,
    Navigator,
    NavState,
    Route,
    TouchableOpacity,
    ViewStyle,
    StyleSheet,
    StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import StopwatchList from "./component/stopwatch-list";
import Report from "./component/report";
import {setStopwatches, getState} from "./store";
import StopwatchData from "./stopwatch-data";

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
        backgroundColor: "#27ae60",
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

const ROUTE_MAPPER = {
    Title: (route: Route, nav: Navigator, index: number, navState: NavState): JSX.Element => {
        return <View style={ STYLES.navbarTitle }>
            <Text style={ STYLES.navbarTitleText }>stopwatch</Text>
        </View>;
    },
    LeftButton: (route: Route, nav: Navigator, index: number, navState: NavState): JSX.Element => {
        if (route.title === "report") {
            return <TouchableOpacity onPress={ () => nav.pop() } style={ STYLES.button }>
                <Icon name="chevron-left" size={ 30 } style={ STYLES.buttonText }/>
            </TouchableOpacity>;
        }
        return <TouchableOpacity onPress={ () => report(nav) } style={ STYLES.button }>
            <Icon name="assignment" size={ 20 } style={ STYLES.buttonText }/>
        </TouchableOpacity>;
    },
    RightButton: (route: Route, nav: Navigator, index: number, navState: NavState): JSX.Element => {
        if (route.title === "report") {
            return null;
        }
        return <TouchableOpacity onPress={ add } style={ STYLES.button }>
            <Icon name="alarm-add" size={ 20 } style={ STYLES.buttonText }/>
        </TouchableOpacity>;
    }
};

const report = (nav: Navigator) => {
    nav.push({
        title: "report"
    });
};

const add = () => {
    const stopwatches: StopwatchData[] = getState().stopwatches;
    stopwatches.push(new StopwatchData("Stopwatch " + stopwatches.length));

    // create a shallow copy in a new array to trigger redux to update properly
    setStopwatches(stopwatches.slice());
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

const configureScene = (route: Route, routeStack: Route[]) => {
    switch (route.title) {
        case "report":
            return Navigator.SceneConfigs.FloatFromBottom;
        default:
            return Navigator.SceneConfigs.FloatFromRight;
    }
};

export default class App extends React.Component<void, void> {

    public render(): React.ReactElement<View> {
        return <Navigator
            navigationBar={ <Navigator.NavigationBar style={ STYLES.navbar } routeMapper={ ROUTE_MAPPER } /> }
            initialRoute={ INITIAL_ROUTE }
            renderScene={ renderScene }
            configureScene={ configureScene }
            sceneStyle={ STYLES.scene }/>;
    }

}
