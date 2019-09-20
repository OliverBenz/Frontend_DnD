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
      spell: {
        "id": undefined,
        "name": undefined,
        "level": undefined,
        "range": undefined,
        "castTime": undefined,
        "save": undefined,
        "duration": undefined
      },
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
    return(
      <ScrollView style={styles.container}>
        {/* Heading 1 */}
        <View style={{flexDirection: 'row', marginBottom: 10}}>
        {/* TODO: Remove name from fields, second row only components and duration */}
          <Text style={[styles.text, {flex: 1, marginRight: 5, textAlign: 'center'}]}>Range</Text>
          <Text style={[styles.text, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>Cast Time</Text>
          <Text style={[styles.text, {flex: 3, marginLeft: 5}]}>Duration</Text>
        </View>

        {/* Spell Data Row 1 */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text style={[styles.textBorder, {flex: 1, marginRight: 5, textAlign: 'center'}]}>{ this.state.spell.range }</Text>
          <Text style={[styles.textBorder, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>{ this.state.spell.castTime }</Text>
          <Text style={[styles.textBorder, {flex: 3, marginLeft: 5}]}>{ this.state.spell.duration }</Text>
        </View>
        
        {/* Heading 2 */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text style={[styles.text, {flex: 3}]}>Components</Text>
        </View>

        {/* Spell Data Row 2 */}
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Text style={[styles.textBorder, {flex: 3}]}>{ this.state.spell.components }</Text>
        </View>

        <Text style={styles.textBorder}>{ this.state.spell.desc }</Text>

        { this._renderButton() }
      </ScrollView>
    );
  }

  _renderButton = () => {
    if(!this.state.userHas){
      return(
        <TouchableOpacity style={styles.button} onPress={() => this._updateCharSpells(this.state.spell.id, "POST")}>
          <Image source={require('../resources/icons/add.png')} style={{marginRight: 10}} />
          <Text>Add to Character</Text>
        </TouchableOpacity>
      )
    }
    else{
      return(
        <TouchableOpacity style={styles.button} onPress={() => this._updateCharSpells(this.state.spell.id, "DELETE")}>
          <Image source={require('../resources/icons/clear.png')} style={{marginRight: 10}} />
          <Text>Remove from Character</Text>
        </TouchableOpacity>
      )
    }
  }

  // Data fetching

  _fetchSpell = (id) => {
    getData("ip").then((ip) => {
      fetch(ip + "spellSpec/" + id, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.json())
      .then((resJ) => {
        if(resJ["success"]){
          this.setState({ spell: resJ.data[0] });
          this._checkIfHas(id);
        };
      });
    });
  }

  _checkIfHas = (spellId) => {
    // Check if character has spell in list
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + 'checkCharSpell' + "/" + sessionId + "/" + charString + "/" + spellId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => res.json())
          .then((resJ) => this.setState({ userHas: resJ.data }));
        });
      });
    });
  }

  _updateCharSpells = (spellId, method) => {
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + 'charSpells/' + sessionId + "/" + charString, {
            method: method,
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "spellId": spellId
            }),
          })
          .then((res) => res.json())
          .then((resJ) => {
            if(resJ.success){
              if(method === "POST") this.setState({ userHas: resJ.data });
              if(method === "DELETE") this.setState({ userHas: resJ.data });
            }
            });
        });
      });
    });
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
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  }
});