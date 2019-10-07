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

    this._getMoney();
  }

  componentWillUnmount(){
    getData("sessionId").then((sessionId) => {
      getData("charString").then((charString) => {
        this._postMoney();
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

  _getMoney = async () => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");
    
    fetch(`${ip}/character/money/${charString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({copper: resJ.data.copper, silver: resJ.data.silver, electrum: resJ.data.electrum, gold: resJ.data.gold, platinum: resJ.data.platinum, isLoading: false});
    })
    .catch((error) => {
      alert(error);
    });

  }

  _postMoney = async () => {
    this._checkData();

    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");
    const { copper, silver, electrum, gold, platinum } = this.state;
    
    fetch(`${ip}/character/money/${charString}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
      body: JSON.stringify({
        copper: copper,
        silver: silver,
        electrum: electrum,
        gold: gold,
        platinum: platinum
      }),
    });

  }

  _checkData = () => {
    if(this.state.copper === undefined) this.setState({ copper: 0 });
    if(this.state.silver === undefined) this.setState({ silver: 0 });
    if(this.state.electrum === undefined) this.setState({ electrum: 0 });
    if(this.state.gold === undefined) this.setState({ gold: 0 });
    if(this.state.platinum === undefined) this.setState({ platinum: 0 });
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  }
});