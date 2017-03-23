import * as React from "react";
import * as ReactRedux from "react-redux";
import { View, Text, Navigator, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import StopwatchList from "./component/stopwatch-list";
import Report from "./component/report";
import { mapStateToProps, mapDispatchToProps } from "./store";
import StopwatchData from "./stopwatch-data";
import { getHighestLapCount, HEADER_COLOR } from "./util";
const STYLES = StyleSheet.create({
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
const INITIAL_ROUTE = {
    title: "stopwatch_list",
    index: 0
};
const report = (nav) => {
    nav.push({
        title: "report"
    });
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
const configureScene = (route) => {
    switch (route.title) {
        case "report":
            return Navigator.SceneConfigs.FloatFromBottom;
        default:
            return Navigator.SceneConfigs.FloatFromRight;
    }
};
class App extends React.Component {
    routeMapper() {
        return {
            Title: () => {
                return React.createElement(View, { style: STYLES.navbarTitle },
                    React.createElement(Text, { style: STYLES.navbarTitleText }, "stopwatch"));
            },
            LeftButton: (route, nav) => {
                if (route.title === "report") {
                    return React.createElement(TouchableOpacity, { onPress: () => nav.pop(), style: STYLES.button },
                        React.createElement(Icon, { name: "chevron-left", size: 30, style: STYLES.buttonText }));
                }
                if (this.props.stopwatches.length === 0 || getHighestLapCount(this.props.stopwatches) === 0) {
                    return null;
                }
                return React.createElement(TouchableOpacity, { onPress: () => report(nav), style: STYLES.button },
                    React.createElement(Icon, { name: "assignment", size: 20, style: STYLES.buttonText }));
            },
            RightButton: (route) => {
                if (route.title === "report") {
                    return null;
                }
                return React.createElement(TouchableOpacity, { onPress: this.add.bind(this), style: STYLES.button },
                    React.createElement(Icon, { name: "alarm-add", size: 20, style: STYLES.buttonText }));
            }
        };
    }
    add() {
        const stopwatches = this.props.stopwatches;
        stopwatches.push(new StopwatchData("Stopwatch " + stopwatches.length));
        this.props.setStopwatches(stopwatches);
    }
    render() {
        return React.createElement(Navigator, { navigationBar: React.createElement(Navigator.NavigationBar, { style: STYLES.navbar, routeMapper: this.routeMapper() }), initialRoute: INITIAL_ROUTE, renderScene: renderScene, configureScene: configureScene, sceneStyle: STYLES.scene });
    }
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=app.js.map