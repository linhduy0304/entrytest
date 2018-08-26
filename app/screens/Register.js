

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { validateEmail } from '../components/Functions';
import {insert,insertStatus, getUsername} from '../database/allSchema'
import SimpleToast from 'react-native-simple-toast'
import { Actions } from 'react-native-router-flux';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fullname: '',
      email: '',
      pass: '',
      confirmPass: '',
    };
  }

  register() {
    const {username, fullname, email, pass, confirmPass} = this.state;
    if(username === '' || fullname === '' || email === '' || confirmPass === '' ||pass === '') {
      SimpleToast.show('The fields must not be blank');
      return
    }
    if(!validateEmail(email)) {
      SimpleToast.show('Email format not correct!')
      return;
    }
    if(pass !== confirmPass) {
      SimpleToast.show('Password does not match')
      return;
    }
    getUsername(username).then(data => {
      if(data.length === 0) {
        var user = {
          id: Math.floor(Date.now()/1000),
          username,
          fullname,
          email,
          pass,
        };
        insert(user)
        .then(
          Actions.home({username: username})
        )
        .catch(error => {
          console.log(error)
        })
        // insertStatus(user)
        // .then(
        // )
        // .catch(error => {
        //   console.log(error)
        // })
      }else {
        SimpleToast.show('username already exists')
        return
      }
    })
    
  }

  render() {
    const {username, fullname, email, pass, confirmPass} = this.state;
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
            value={fullname}
            marginTop={10}
            placeholder='Full name'
            onChangeText={text => this.setState({fullname: text})}
          />
          <Input 
            value={email}
            marginTop={10}
            placeholder='Email'
            onChangeText={text => this.setState({email: text})}
          />
          <Input 
            value={pass}
            marginTop={10}
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={text => this.setState({pass: text})}
          />
          <Input 
            value={confirmPass}
            marginTop={10}
            secureTextEntry={true}
            placeholder='Confirm password'
            onChangeText={text => this.setState({confirmPass: text})}
          />
          <Button 
            label='Register'
            active={true}
            onPress={() => this.register()}
            marginTop={20}
          />
        </View>
      </ScrollView>
    );
  }
}

export default Register;
