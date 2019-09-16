import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './view/login';
import Home from './view/home';

export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                    hideNavBar={false}
                    navigationBarStyle={{backgroundColor: '#1565c0',}}
                    titleStyle={{color: 'white',}}
            >
                <Stack key="root">
                    <Scene key="login" component={Login} title="Login"/>
                    <Scene key="home" component={Home} title="home"/>
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}