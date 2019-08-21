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

import Converter from './converter'

type Props = {};


export default class Home extends Component<Props>{
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
    return(
      <View style={{marginTop: 10}}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Converter')} style={styles.button}>
          <Text style={styles.text}>Converter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SpellList')} style={styles.button}>
          <Text style={styles.text}>Spell List</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Character')} style={styles.button}>
          <Text style={styles.text}>Character</Text>
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
    marginBottom: 10,
  },
  text: {
    fontSize: 18
  }
});