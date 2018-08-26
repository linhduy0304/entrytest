

import React, { Component } from 'react';
import { View, Text,Picker } from 'react-native';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: 'username'
    };
  }

  setSort(sort) {
    this.props.loadAll(sort)
    this.setState({sort})
  }

  render() {
    const {sort} = this.state;
    return (
      <View style={{flexDirection: 'row',padding: 15, alignItems: 'center'}}>
        <Text>Sort By: </Text>
        <Picker
          selectedValue={sort}
          style={{ height: 40, flex: 1}}
          onValueChange={(itemValue, itemIndex) => this.setSort(itemValue)}>
          <Picker.Item label="user name" value="username" />
          <Picker.Item label="full name" value="fullname" />
          <Picker.Item label="email" value="email" />
        </Picker>
      </View>
    );
  }
}

export default Sort;
