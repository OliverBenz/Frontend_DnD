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

type Props = {};

export default class Health extends Component<Props>{
  constructor(props){
    super(props);

    this.state = {
      maxHealth: 0,
      currentHealth: 0,
      tempHealth: 0
    }

    fetch('http://benz-prints.com:3004/dnd/charHealth/xyz/Hk6Sh1m9^aWd9NMOdKh', {
      mehod: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({maxHealth: resJ.data.maxHealth, currentHealth: resJ.data.currentHealth, tempHealth: resJ.data.tempHealth});
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.healthView}>
          <Text>Max Health</Text>
          <TextInput onChange={(e) => this.setState({ maxHealth: e.nativeEvent.text })} value={String(this.state.maxHealth)} />        
        </View>
        <View style={styles.healthView}>
          <Text>Current Health</Text>
          <TextInput onChange={(e) => this.setState({ currentHealth: e.nativeEvent.text })} value={String(this.state.currentHealth)} />
        </View>
        <View style={styles.healthView}>
          <Text>Temp Health</Text>
          <TextInput onChange={(e) => this.setState({tempHealth: e.nativeEvent.text})} value={String(this.state.tempHealth)} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1
  },
  healthView: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});