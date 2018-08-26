

import React, { Component } from 'react';
import { View, Text, ScrollView, Keyboard } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import {getAcount} from '../database/allSchema';
import SimpleToast from 'react-native-simple-toast'
import { Actions } from 'react-native-router-flux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
    };
  }

  login() {
    const {username,  pass} = this.state;
    Keyboard.dismiss();
    if(username === '' || pass === '') {
      SimpleToast.show('The fields must not be blank');
      return
    }
    getAcount(username, pass).then(data => {
      if(data.length === 1) {
       Actions.home({type: 'reset', username: username})
      }else {
        SimpleToast.show('Account does not exist');
        return
      }
    })
    
  }

  render() {
    const {username, pass} = this.state;
    return (
      <ScrollView 
        keyboardShouldPersistTaps={'always'}
        style={{flex: 1,backgroundColor: '#fff'}}
      >
        <View style={{flex: 1,alignItems: 'center', paddingTop: 50}}>
          <Input 
            value={username}
            placeholder='User name'
            onChangeText={text => this.setState({username: text})}
          />
          <Input 
            value={pass}
            marginTop={10}
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={text => this.setState({pass: text})}
          />
           <Button 
            label='Login'
            active={true}
            onPress={() => this.login()}
            marginTop={20}
          />
          <Button 
            label='Go to register'
            active={true}
            onPress={() => Actions.register()}
            marginTop={20}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Login;
