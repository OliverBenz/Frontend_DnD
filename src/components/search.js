'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Image
} from 'react-native';

export default function Search(props){

  return (
    <View style={styles.searchField}>
      <TouchableOpacity onPress={() => props.onConfirm()}>
        <Image source={require('../resources/icons/search.png')} style={[styles.searchImage, {marginRight: 10}]} />        
      </TouchableOpacity>

      <TextInput style={styles.textInput} onChange={(e) => props.onChange(e.nativeEvent.text)} placeholder={props.placeholder} value={props.value} />

      <TouchableOpacity onPress={() => {props.onClear()}}>
        <Image source={require('../resources/icons/clear.png')} style={styles.searchImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchField: {
    borderWidth: 1,
    borderColor: '#a8b0bd',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10
  },
  searchImage: {
    height: 20,
    width: 20
  },
  textInput: {
    flex: 1,
    fontSize: 18
  }
});