import App from "./bin/app";
import * as React from "react";
import {Provider} from "react-redux";
import {AppRegistry} from "react-native";
import {store} from "./bin/store";

class AppProvider extends React.Component {

    render() {
        return <Provider store={ store }>
            <App />
        </Provider>;
    }

}

AppRegistry.registerComponent("stopwatch", () => AppProvider);
