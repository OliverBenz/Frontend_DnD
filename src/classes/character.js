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


export default class Character extends Component<Props>{
  static navigationOptions = {
    title: 'Character',
  };

  constructor(props){
    super(props);
    this.state = {
      health: {
        max: 24,
        temp: 0,
        now: 12,
      },
      money: {
        platinum: 0,
        gold: 0,
        electron: 0,
        silver: 0,
        copper: 0
      },
    }
  }

  render(){
    return(
      <View style={{flexDirection: 'column'}}>
        {/* Health overview */}
        <View style={{flexDirection: 'row'}}>
          
        </View>

        {/* Money Overview */}
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1, textAlign: 'center'}}>CC</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>SC</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>EP</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>GP</Text>
            <Text style={{flex: 1, textAlign: 'center'}}>PP</Text>
          </View>
          
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{flex: 1, textAlign: 'center'}} value={ String(this.state.money.copper) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} value={ String(this.state.money.silver) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} value={ String(this.state.money.electron) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} value={ String(this.state.money.gold) } />
            <TextInput style={{flex: 1, textAlign: 'center'}} value={ String(this.state.money.platinum) } />
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({

});