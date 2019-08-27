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

        {/* TODO: Navigate to spellList with charSpells URL */}
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SpellList', { title: "Character Spells", url: "http://benz-prints.com:3004/dnd/charSpells/xyz/Hk6Sh1m9^aWd9NMOdKh" })}>
          <Text>Spells</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text>Notes</Text>
        </TouchableOpacity>
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