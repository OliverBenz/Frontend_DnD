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

type Props = {};

export default class Money extends Component<Props>{
  constructor(props){
    super(props);

    this.state = {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0
    }

    fetch("http://benz-prints.com:3004/dnd/charMoney/xyz/Hk6Sh1m9^aWd9NMOdKh", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({copper: resJ.data.copper, silver: resJ.data.silver, electrum: resJ.data.electrum, gold: resJ.data.gold, platinum: resJ.data.platinum});
    });
  }
  render(){
    return(
      <View>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, textAlign: 'center'}}>CC</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>SC</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>EP</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>GP</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>PP</Text>
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{flex: 1, textAlign: 'center'}} onChange={(e) => this.setState({copper: e.nativeEvent.text}) } value={ String(this.state.copper) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} onChange={(e) => this.setState({silver: e.nativeEvent.text})} value={ String(this.state.silver) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} onChange={(e) => this.setState({electrum: e.nativeEvent.text})} value={ String(this.state.electrum) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} onChange={(e) => this.setState({gold: e.nativeEvent.text})} value={ String(this.state.gold) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} onChange={(e) => this.setState({platinum: e.nativeEvent.text})} value={ String(this.state.platinum) } />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});