'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import { getData } from '../../services/asyStorage';

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

  render(){
    return(
      <View>
      
      </View>
    )
  }
}

const styles = StyleSheet.create({

});