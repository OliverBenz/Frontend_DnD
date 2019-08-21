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

export default class General extends Component<Props>{
  constructor(props){
    super(props);

    fetch('', {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json'
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      // TODO: Save data to props
    }); 
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