'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { storeData, getData } from '../../services/asyStorage';

type Props = {};

export default class NewChar extends Component<Props>{
  static navigationOptions = {
    title: 'Create new Character',
  };

  constructor(props){
    super(props);
    
    this.state = { };
  }

  render(){
    return(
      <View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

});