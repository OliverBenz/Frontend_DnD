'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { getMultiple } from '../../services/asyStorage';

export default class Health extends Component{
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

    this._getHealth();
  }

  componentWillUnmount(){
    this._postHealth();
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

  _getHealth = async () => {
    const { ip, authKey, charString } = await getMultiple(["ip", "authKey", "charString"]);

    fetch(`${ip}/character/health/${charString}`, {
      mehod: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({maxHealth: resJ.data.maxHealth, currentHealth: resJ.data.currentHealth, tempHealth: resJ.data.tempHealth, isLoading: false});
    })
    .catch((error) => {
      /* alert(error) */
    });
  }

  _postHealth = async () => {
      this._checkData();

      const { ip, authKey, charString } = await getMultiple(["ip", "authKey", "charString"]);
      const { maxHealth, currentHealth, tempHealth } = this.state;
      
      fetch(`${ip}/character/health/${charString}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${authKey}`
        },
        body: JSON.stringify({
          maxHealth: maxHealth,
          currentHealth: currentHealth,
          tempHealth: tempHealth
        }),
      });
  }

  _checkData = () => {
    if(this.state.maxHealth === undefined) this.setState({ maxHealth: 0 });
    if(this.state.currentHealth === undefined) this.setState({ currentHealth: 0 });
    if(this.state.tempHealth === undefined) this.setState({ tempHealth: 0 });
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