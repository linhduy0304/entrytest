

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Input from '../Input';
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.text,
    };
  }
	filter(input) {
    this.setState({input})
		this.props.filter(input)
	}
  render() {
		const {input} = this.state
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
				<Text style={{marginRight: 10}}>Filter by search</Text>
        <Input 
					value={input}
					placeholder='enter a string'
					onChangeText={text=> this.filter(text)}
        />
			
      </View>
    );
  }
}

export default Filter;

