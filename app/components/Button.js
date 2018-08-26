

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { screen } from '../config/Const';

const Button = ({
  active,
  label,
  onPress,
  borderRadius = 5,
  width = screen.width/3,
  height = 40,
  color = '#fff',
  fontWeight = '500',
  marginTop = 0,
  fontSize = 14,
}) => (
    <TouchableOpacity
      disabled={active ? false : true}
      style={{
        borderRadius,
        height,
        marginTop,
        width,
        backgroundColor: active ? '#3761ba' : '#899ebf',
        alignItems: 'center',
        justifyContent: 'center',
      }} 
      onPress={onPress} >
      <Text style={{
        color,
        fontWeight,
        fontSize
      }}>{label}</Text>
    </TouchableOpacity>
);

export default Button;
