'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

export default class AddNew extends Component{
  render() {
    return (
      <View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', margin: 10}} onPress={() => this.props.callback()}>
          <Image source={require('../resources/icons/add.png')} style={{marginRight: 10}} />
          <Text style={{ fontSize: 18 }}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});