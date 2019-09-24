'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
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
          this.props.navigation.navigate('SpellList', { title: "Spell List", url: ip + "character/spells/" + sessionId + "/" + charString, charSpells: true });
        });
      });
    });
  }

  render(){
    return(
      <ScrollView>
        <General />
        <Health />
        <Money />

        <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={() => this._navSpells()}>
          <Text>Spells</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("Notes")}>
          <Text>Notes</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 15,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    margin: 10,
  },
});