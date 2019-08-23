'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

import Money from './character/money';
import Health from './character/health';
import General from './character/general';

type Props = {};


export default class Character extends Component<Props>{
  static navigationOptions = {
    title: 'Character',
  };

  constructor(props){
    super(props);
    this.state = { };
  }

  render(){
    return(
      <View>
        <View>
          <General />
          <Health />
          <Money />
        </View>

        {/* <TouchableOpacity style={styles.button} onPress={this._updateData()}>
          <Text>Update</Text>
        </TouchableOpacity>         */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginTop: 10,
    marginBottom: 10
  },
});