'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { getData } from '../../services/asyStorage';

type Props = {};

export default class Health extends Component<Props>{
  constructor(props){
    super(props);

    this.state = {
      maxHealth: 0,
      currentHealth: 0,
      tempHealth: 0,

      isLoading: false
    }
  }

  componentDidMount(){
    this.setState({ isLoading: true });

    getData("sessionId").then((sessionId) => {
      getData("charString").then((charString) =>{
        this._getAPI(sessionId, charString);
      });
    });
  }

  render(){
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return(
      <View style={styles.container}>
        <View style={styles.healthView}>
          <Text style={styles.text}>Max Health</Text>
          <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({ maxHealth: e.nativeEvent.text })} value={String(this.state.maxHealth)} />        
        </View>
        <View style={styles.healthView}>
          <Text style={styles.text}>Current Health</Text>
          <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({ currentHealth: e.nativeEvent.text })} value={String(this.state.currentHealth)} />
        </View>
        <View style={styles.healthView}>
          <Text style={styles.text}>Temp Health</Text>
          <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({tempHealth: e.nativeEvent.text})} value={String(this.state.tempHealth)} />
        </View>
      </View>
    )
  }

  // Data fetching

  _getAPI = (sessionId, charString) => {
    fetch('http://benz-prints.com:3004/dnd/charHealth/' + sessionId + '/' + charString, {
      mehod: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({maxHealth: resJ.maxHealth, currentHealth: resJ.currentHealth, tempHealth: resJ.tempHealth, isLoading: false});
    })
    .catch((error) => {
      alert(error)
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
    borderWidth: 1,
    
    marginBottom: 40,

    paddingTop: 10,
    paddingBottom: 10
  },
  healthView: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  }
});