'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

type Props = {};

export default class General extends Component<Props>{
  constructor(props){
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      level: 0,
      xp: 0,
      alignment: "",
      background: "",
      age: 0,
      height: 0,
      weight: 0,

      isLoading: false
    }
  }

  componentDidMount(){
    this.setState({isLoading: true});

    fetch('http://benz-prints.com:3004/dnd/charGeneral/xyz/Hk6Sh1m9^aWd9NMOdKh', {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json'
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((resJ) => {
      this.setState({firstname: resJ.firstname, lastname: resJ.lastname, level: resJ.level, xp: resJ.xp, alignment: resJ.alignment, background: resJ.background, age: resJ.age, height: resJ.height, weight: resJ.weight, isLoading: false});
    })
    .catch((error) => {
      alert(error);
    });
  }

  render(){
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return(
      <View style={styles.title}>
        <Text style={styles.heading}>{this.state.firstname} {this.state.lastname} - Lvl: {this.state.level}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.heading}>XP: </Text>
          <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.heading}  onChange={(e) => {this.setState({xp: e.nativeEvent.text})}} value={String(this.state.xp)} />
        </View>
        
        {/* <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.heading} onChange={(e) => {this.setState({xp: e.nativeEvent.text})}}>{this.state.xp}</TextInput> */}
        {/* <Text>{this.state.lastname}</Text> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  },
  heading: {
    fontSize: 24
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 40,

    alignItems: 'center'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  topRow: {
    marginBottom: 20
  }
});