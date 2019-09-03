'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  TouchableOpacity
} from 'react-native';

import { getData } from '../services/asyStorage';

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

  _navSpells = () => {
    getData("sessionId").then((sessionId) => {
      getData("charString").then((charString) => {
        getData("ip").then((ip) => {
          // CharSpells for +/- Button in spellList
          this.props.navigation.navigate('SpellList', { title: "Spell List", url: ip + "charSpells/" + sessionId + "/" + charString, charSpells: true });
        });
      });
    });
  }

  render(){
    return(
      <View>
        <General />
        <Health />
        <Money />

        <TouchableOpacity style={styles.button} onPress={() => this._navSpells()}>
          <Text>Spells</Text>
        </TouchableOpacity>
      </View>
    )
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