'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

type Props = {};


export default class SpellSpecific extends Component<Props>{
  static navigationOptions = ({navigation}) => {
    return{
      title: navigation.getParam('spell').name + " - Lvl: " + navigation.getParam('spell').level 
    }
  };

  constructor(props){
    super(props);
    this.state = { }
  }

  render(){
    const { params } = this.props.navigation.state;

    return(
      <ScrollView style={styles.container}>
        {/* Heading 1 */}
        <View style={{flexDirection: 'row', marginBottom: 10}}>
        {/* TODO: Remove name from fields, second row only components and duration */}
          <Text style={[styles.text, {flex: 1, marginRight: 5, textAlign: 'center'}]}>Range</Text>
          <Text style={[styles.text, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>Cast Time</Text>
          <Text style={[styles.text, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>Save</Text>
          <Text style={[styles.text, {flex: 3, marginLeft: 5}]}>Duration</Text>
        </View>

        {/* Spell Data Row 1 */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text style={[styles.textBorder, {flex: 1, marginRight: 5, textAlign: 'center'}]}>{ params.spell.range }</Text>
          <Text style={[styles.textBorder, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>{ params.spell.castingTime }</Text>
          <Text style={[styles.textBorder, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>{ params.spell.save }</Text>
          <Text style={[styles.textBorder, {flex: 3, marginLeft: 5}]}>{ params.spell.duration }</Text>
        </View>
        
        {/* Heading 2 */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          {/* <Text style={[styles.text, {flex: 3, marginRight: 5}]}>Duration</Text> */}
          <Text style={[styles.text, {flex: 3}]}>Components</Text>
        </View>
        {/* Spell Data Row 2 */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          {/* <Text style={[styles.textBorder, {flex: 3, marginRight: 5}]}>{ params.spell.duration }</Text> */}
          <Text style={[styles.textBorder, {flex: 3}]}>{ params.spell.components }</Text>
        </View>

        <Text style={styles.textBorder}>{ params.spell.descLong }</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#ededed',
    padding: 10
  },
  textBorder: {
    fontSize: 18,
    // borderWidth: 1,
    // borderColor: '#a8b0bd',
    backgroundColor: '#f7f7f7'
  },
  text: {
    fontSize: 18
  }
});