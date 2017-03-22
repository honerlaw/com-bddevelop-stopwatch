import * as React from "react";
import { View, Text, Navigator, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import StopwatchList from "./component/stopwatch-list";
import Report from "./component/report";
import { setStopwatches, getState } from "./store";
import StopwatchData from "./stopwatch-data";
const STYLES = StyleSheet.create({
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
const INITIAL_ROUTE = {
    title: "stopwatch_list",
    index: 0
};
const ROUTE_MAPPER = {
    Title: (route, nav, index, navState) => {
        return React.createElement(View, { style: STYLES.navbarTitle },
            React.createElement(Text, { style: STYLES.navbarTitleText }, "stopwatch"));
    },
    LeftButton: (route, nav, index, navState) => {
        if (route.title === "report") {
            return React.createElement(TouchableOpacity, { onPress: () => nav.pop(), style: STYLES.button },
                React.createElement(Icon, { name: "chevron-left", size: 30, style: STYLES.buttonText }));
        }
        return React.createElement(TouchableOpacity, { onPress: () => report(nav), style: STYLES.button },
            React.createElement(Icon, { name: "assignment", size: 20, style: STYLES.buttonText }));
    },
    RightButton: (route, nav, index, navState) => {
        if (route.title === "report") {
            return null;
        }
        return React.createElement(TouchableOpacity, { onPress: add, style: STYLES.button },
            React.createElement(Icon, { name: "alarm-add", size: 20, style: STYLES.buttonText }));
    }
};
const report = (nav) => {
    nav.push({
        title: "report"
    });
};
const add = () => {
    const stopwatches = getState().stopwatches;
    stopwatches.push(new StopwatchData("Stopwatch " + stopwatches.length));
    // create a shallow copy in a new array to trigger redux to update properly
    setStopwatches(stopwatches.slice());
};
const getScene = (route, navigator) => {
    switch (route.title) {
        case "report":
            return React.createElement(Report, null);
        default:
            return React.createElement(StopwatchList, { navigator: navigator });
    }
};
const renderScene = (route, navigator) => {
    return React.createElement(View, { style: { flex: 1 } },
        React.createElement(StatusBar, { barStyle: "light-content" }),
        getScene(route, navigator));
};
const configureScene = (route, routeStack) => {
    switch (route.title) {
        case "report":
            return Navigator.SceneConfigs.FloatFromBottom;
        default:
            return Navigator.SceneConfigs.FloatFromRight;
    }
};
export default class App extends React.Component {
    render() {
        return React.createElement(Navigator, { navigationBar: React.createElement(Navigator.NavigationBar, { style: STYLES.navbar, routeMapper: ROUTE_MAPPER }), initialRoute: INITIAL_ROUTE, renderScene: renderScene, configureScene: configureScene, sceneStyle: STYLES.scene });
    }
}
//# sourceMappingURL=app.js.map