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
import { getData } from '../services/asyStorage';

type Props = {};


export default class SpellSpecific extends Component<Props>{
  static navigationOptions = ({navigation}) => {
    return{
      title: navigation.getParam('spell').name + " - Lvl: " + navigation.getParam('spell').level 
    }
  };

  constructor(props){
    super(props);
    this.state = {
      spell: { },
      userHas: false
    }
  }

  componentDidMount(){
    // TODO: Get spell Id from router
    // Get specific information about spell from backend

    this.setState({ spell: this.props.navigation.state.params.spell });
    this._fetchSpell(this.props.navigation.state.params.spell.id);
  }

  render(){
    const { schoolName, castTime, range, material, duration, page, ritual, concentration, desc, higher_level } = this.state.spell;
    return(
      <ScrollView style={styles.container}>
        {/* Listing */}
        <View style={styles.textContainer}>
          <Text style={styles.header}>School: </Text>
          <Text style={styles.text}>{ schoolName }</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.header}>Casting Time: </Text>
          <Text style={styles.text}>{ castTime }</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.header}>Range: </Text>
          <Text style={styles.text}>{ range }</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.header}>Components: </Text>
          <Text style={styles.text}>{ material }</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.header}>Duration: </Text>
          <Text style={styles.text}>{ duration }</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.header}>Page: </Text>
          <Text style={styles.text}>{ page }</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.header}>Ritual: </Text>
          <Text style={styles.text}>{ ritual }</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.header}>Concentration: </Text>
          <Text style={styles.text}>{ concentration }</Text>
        </View>

        <Text style={[styles.header, {marginTop: 20}]}>Description</Text>
        <Text style={styles.text}>{ desc }</Text>

        <Text style={[styles.header, {marginTop: 20}]}>At Higher Levels:</Text>
        <Text style={styles.text}>{ higher_level }</Text>

        { this._renderButton() }
      </ScrollView>
    );
  }

  _renderButton = () => {
    const { id } = this.state.spell;

    if(!this.state.userHas){
      return(
        <TouchableOpacity style={styles.button} onPress={() => this._updateCharSpells(id, "POST")}>
          <Image source={require('../resources/icons/add.png')} style={{marginRight: 10}} />
          <Text>Add to Character</Text>
        </TouchableOpacity>
      )
    }
    else{
      return(
        <TouchableOpacity style={styles.button} onPress={() => this._updateCharSpells(id, "DELETE")}>
          <Image source={require('../resources/icons/clear.png')} style={{marginRight: 10}} />
          <Text>Remove from Character</Text>
        </TouchableOpacity>
      )
    }
  }

  // Data fetching

  _fetchSpell = async (id) => {
    const ip = await getData("ip");

    fetch(`${ip}/general/spellSpec/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.json())
    .then((resJ) => {
      if(resJ.success){
        this.setState({ spell: resJ.data[0] });
        this._checkIfHas(id);
      };
    });

  }

  // Check if character has spell in list
  _checkIfHas = async (spellId) => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

    fetch(`${ip}/character/checkSpell/${charString}/${spellId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
    })
    .then((res) => res.json())
    .then((resJ) => this.setState({ userHas: resJ.data }));
  }

  _updateCharSpells = async (spellId, method) => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

    fetch(`${ip}/character/spells/${charString}/${spellId}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      if(resJ.success) this.setState({ userHas: resJ.data });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    // backgroundColor: '#ededed',
    padding: 10
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 5
  },
  text: {
    fontSize: 18
  },
  header:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  }
});