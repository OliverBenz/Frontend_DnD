'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Counter from '../components/counter';

type Props = {};

export default class Tracker extends Component<Props>{
  static navigationOptions = {
    title: 'Tracker',
  };

  constructor(props){
    super(props);
    this.state = { };
  }

  render(){
    // TODO: Lucky feat tracker
    // TODO: Spell slot tracker
    // TODO: Hit Dice tracker
    // TODO: 
    return(
      <View>
        <Counter />
      </View>
    )
  }
}

const styles = StyleSheet.create({

});