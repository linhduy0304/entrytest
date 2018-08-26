

import React, { Component } from 'react';
import { View, Text, StyleSheet, Keyboard, Animated, Easing } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

class Triangle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: new Animated.Value(0),
      input: '10',
      active: false,
      show: false,
      arr: [],
      view: 0,
      err: '',
      text: 0,
    };
  }

  isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n > 0;
  }

  checkInput(text) {
      var a = this.isNormalInteger(text);
      if(a) {
        this.setState({
          active: true,
          show: false,
          arr: [],
          input: text,
          err: ''
        })
       
      }else {
        this.setState({
          active: false,
          show: false,
          input: text,
          err: ''
        })
      }
  }

  getArrNum(input) {
    var arr = this.state.arr
    for (var i = 0; i < input; i++) { 
      arr[i] = new Array(i+1);
      for (var j = 0; j < i+1; j++) {            
        if (j === 0 || j === i) {
          arr[i][j] = 1;
        } else {
          arr[i][j] = arr[i-1][j-1] + arr[i-1][j];
        }
      }
    }
    return arr;
  }

  renderTriangle(input) {
    const rotate = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: [`${this.state.view}deg`,`${this.state.view}deg`]
    })
    const text = this.state.rotate.interpolate({
      inputRange: [0, 1],
      outputRange: [`${this.state.text}deg`,`${this.state.text}deg`]
    })

    a = this.getArrNum(input);
    return(
      <Animated.View style={{alignItems: 'center', transform: [{rotate: rotate}]}}>
        {
          a.map((a, i1) => {
            return(
              
              <View key={i1} style={{flexDirection: 'row', }}>
                {
                  a.map((c, i2) => {
                    return (
                      <Animated.Text style={{marginLeft: 20, transform: [{rotate: text}]}} key={i2}>{c}</Animated.Text>
                    )
                  })
                }
              </View>
            )
          })
        }
      </Animated.View>
      
    )
  }

  show() {
    Keyboard.dismiss();
    this.setState({show: true});
  }

  rotate() {
    Animated.timing(
        this.state.rotate,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start();
    Animated.timing(
      this.state.rotate,
    {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear
    }
  ).start()
    this.setState({
      view: this.state.view+90,
      text: this.state.text-90,
    })
  }

  render() {
    const {input, active, show, err} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
        <View style={styles.ct}>
          <Input 
            value={input}
            active={active}
            keyboardType='numeric'
            onChangeText={text => this.checkInput(text)}
          />
          <Button 
            active={active}
            label='Create'
            onPress={() => this.show()}
          />
        </View>
        {
          err !== '' ?
          <Text style={{color: 'red'}}>{err}</Text>
          : null
        }
        <View style={{flex: 1, alignItems: 'center',justifyContent: 'center', }}>
        {
          
          show ? 
            this.renderTriangle(input)
            : null
        }
        </View>

        {
          show ? 
            <Button 
              label="Rotate"
              active={true}
              onPress={() => this.rotate()}
            />
          : null
        }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default Triangle;
