import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import Triangle from '../app/screens/Triangle';
import App from './screens/App';
import Register from './screens/Register';
import Home from './screens/Home';
import Login from './screens/Login';

const Root = () => (
    <Router>
      <Stack key="root">
        <Scene key="app" initial={true} hideNavBar={true} component={App} />
        <Scene key="triangle"  hideNavBar={true} component={Triangle} />
        <Scene key="register"  hideNavBar={true} component={Register} />
        <Scene key="home"  hideNavBar={true} component={Home} />
        <Scene key="login"  hideNavBar={true} component={Login} />
      </Stack>
    </Router>
);

export default Root;