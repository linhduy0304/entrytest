

import React from 'react';
import { Text, View } from 'react-native';

const Label = ({
    params,
}) => (
  <View style={{flexDirection: 'row', backgroundColor: '#7399d6', paddingTop: 10, paddingBottom: 10}}>
    <Text style={{flex: 1, textAlign: 'center', color: '#fff'}}>username</Text>
    <Text style={{flex: 1, textAlign: 'center', color: '#fff'}}>fullname</Text>
    <Text style={{flex: 2, textAlign: 'center', color: '#fff'}}>email</Text>
  </View>
);

export default Label;
