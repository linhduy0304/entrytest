

import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { screen } from '../config/Const';

const Input = ({
  width = screen.width/2,
  onChangeText=text,
  value,
  secureTextEntry= false,
  placeholder='Enter a positive integer',
  keyboardType='default',
  marginTop=0,
}) => (
      <View style={[css.ctInput, {width, marginTop}]}>
        <TextInput 
          value={value}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor='#b2b9c4'
          keyboardType={keyboardType}
          onChangeText={text => onChangeText(text)}
          style={{
            flex: 1,
            padding: 0,
            paddingLeft: 20,
            fontSize: 13,
          }}
        />
      </View>
);

const css = StyleSheet.create({
  
  ctInput: {
    borderWidth: 1,
    borderColor: '#3761ba',
    height: 40,
    borderRadius: 30,
  },
})

export default Input;
