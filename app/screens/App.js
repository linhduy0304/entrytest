

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button 
          label='Task 1'
          active={true}
          onPress={() => Actions.triangle()}
        />
        <Button 
          label='Task 2'
          active={true}
          marginTop={20}
          onPress={() => Actions.login()}
        />
      </View>
    );
  }
}

export default App;
