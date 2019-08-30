'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

class Counter extends Component{
  state = {
    value: 0,
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{fontSize: 20, paddingLeft: 10, paddingRight: 10}} placeholder="0" value={String(this.state.value)} />

        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => this.setState({ value: this.state.value + 1 }) } style={styles.button}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={ () => this.setState({ value: this.state.value - 1 }) } style={styles.button}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline'
  },
  text: {
    fontSize: 18,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    justifyContent: 'center',
    alignItems: 'center',
    
    width: 40,
    height: 40,
  },
});

export default Counter;