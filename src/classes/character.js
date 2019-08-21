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

type Props = {};


export default class Character extends Component<Props>{
  static navigationOptions = {
    title: 'Character',
  };

  constructor(props){
    super(props);
    this.state = {
      health: {
        max: 24,
        temp: 0,
        now: 12,
      }
    }
  }

  render(){
    return(
      <View style={{flexDirection: 'column'}}>
        <Health />
        <Money />       
      </View>
    );
  }
}

const styles = StyleSheet.create({

});