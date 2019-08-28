'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  TouchableOpacity
} from 'react-native';

import { getData, storeData } from '../services/asyStorage';

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

    this.state = {
      charList: [],
      charString: "",
      sessionId: ""
    };
  }

  _renderCharList = (c) => {
    return(
      <Picker.Item key={c.charString} label={c.firstname + " " + c.lastname + " - Lvl: " + c.level} value={c.charString} />
    )
  }

  _valueChange = (value) => {
    this.setState({ charString: value });
    storeData("charString", value);
  }

  render(){
    return(
      <View>
        {/* Heading */}
        <View style={styles.container}>

        </View>

        <Health />
        <Money />

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text>Spells</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text>Save</Text>
        </TouchableOpacity>      
      </View>
    )
  }

  // Data Fetching

  _fetchCharList = (sessionId) => {
    fetch('http://benz-prints.com:3004/dnd/charList/' + sessionId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({ charList: resJ, isLoading: false });

      getData("charString").then((res) => {
        if(res === null){
          storeData("charString", resJ[0].charString);
        }
      });
    });
  }
}

const styles = StyleSheet.create({
    container: {
    marginBottom: 40,

    paddingTop: 10,
    paddingBottom: 10,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});