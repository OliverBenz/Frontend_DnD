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

export default class Money extends Component<Props>{
  constructor(props){
    super(props);

    this.state = {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,

      isLoading: false
    }
  }

  componentDidMount(){
    this.setState({ isLoading: true });

    getData("sessionId").then((sessionId) => {
      getData("charString").then((charString) => {
        this.setState({ sessionId: sessionId, charString: charString });
        this._getAPI(sessionId, charString);
      });
    });    
  }

  componentWillUnmount(){
    getData("sessionId").then((sessionId) => {
      getData("charString").then((charString) => {
        this._postAPI(sessionId, charString);
      });
    });
  }

  render(){
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return(
      <View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.text}>CC</Text>
            <Text style={styles.text}>SC</Text>
            <Text style={styles.text}>EP</Text>
            <Text style={styles.text}>GP</Text>
            <Text style={styles.text}>PP</Text>
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({copper: e.nativeEvent.text}) } value={ String(this.state.copper) } />
            <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({silver: e.nativeEvent.text})} value={ String(this.state.silver) } />
            <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({electrum: e.nativeEvent.text})} value={ String(this.state.electrum) } />
            <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({gold: e.nativeEvent.text})} value={ String(this.state.gold) } />
            <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={styles.text} onChange={(e) => this.setState({platinum: e.nativeEvent.text})} value={ String(this.state.platinum) } />
          </View>
        </View>
      </View>
    )
  }

  // Data fetching

  _getAPI = (sessionId, charString) => {
    getData("ip").then((ip) => {
      fetch(ip + 'charMoney/' + sessionId + '/' + charString, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((resJ) => {
        this.setState({copper: resJ.copper, silver: resJ.silver, electrum: resJ.electrum, gold: resJ.gold, platinum: resJ.platinum, isLoading: false});
      })
      .catch((error) => {
        alert(error);
      });
    });
  }

  _postAPI = (sessionId, charString) => {
    getData("ip").then((ip) => {
      fetch(ip + 'charMoney/' + sessionId + '/' + charString, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          copper: this.state.copper,
          silver: this.state.silver,
          electrum: this.state.electrum,
          gold: this.state.gold,
          platinum: this.state.platinum
        }),
      });
    });
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  }
});