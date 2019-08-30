'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Picker
} from 'react-native';
import { storeData, getData, remData } from '../services/asyStorage';

type Props = {};


export default class Home extends Component<Props>{
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
    this.state = {
      charList: [ ],

      charString: "",

      loggedIn: true
    }
  }

  componentDidMount(){
    storeData("ip", "http://benz-prints.com:3004/dnd/").then(() => {
      this._checkLogged();
    });
  }

  _checkLogged = () => {
    getData("sessionId").then((sessionId) => {
      // alert(sessionId);
      if(sessionId === undefined){
        this.setState({ loggedIn: false });
      }
      else{
        this.setState({ loggedIn: true });
        this._getCharList(sessionId);
      }
    });
  }

  // ShowButtons
  _showButtons = () => {
    if(this.state.loggedIn){
      return(
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Character')} style={styles.button}>
            <Text style={styles.text}>Character</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._logout()} style={styles.button}>
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return(
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.button}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  _showHeader = () => {
    if(this.state.loggedIn){
      if(this.state.charList.length > 0){
        return(
          <View style={styles.container}>
            <Picker style={{height: 50, flex: 1}} onValueChange={(itemValue) => this._valueChange(itemValue)} selectedValue={this.state.charString}>
              { this.state.charList.map(c => (this._renderCharList(c))) }
            </Picker>
          </View>
        )
      }
      else{
        return(
          <View>
          
          </View>
        )
      }
    }
  }

  _logout = () => {
    // Clear: sessionId, charString, charList
    remData("sessionId").then(() => {
      remData("charString").then(() => {
        this.setState({ charList: [] });
        this._checkLogged();
      });
    });
  }

  _renderCharList = (c) => {
    return(
      <Picker.Item key={c.charString} label={c.firstname + " " + c.lastname + " - Lvl: " + c.level} value={c.charString} />
    )
  }
  _valueChange = (charString) => {
    this.setState({ charString: charString });
    storeData("charString", charString);
  }

  _navSpellList = () => {
    getData("ip").then((ip) => {
      this.props.navigation.navigate('SpellList', { title: "Spell List", url: ip + "getSpells" });
    });
  }

  render(){
    return(
      <View style={{marginTop: 10}}>

        { this._showHeader() }

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Converter')} style={styles.button}>
          <Text style={styles.text}>Converter</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Tracker')} style={styles.button}>
          <Text style={styles.text}>Tracker</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._navSpellList()} style={styles.button}>
          <Text style={styles.text}>Spell List</Text>
        </TouchableOpacity>

        { this._showButtons() }
      </View>
    );
  }

  // Data fetching

  _getCharList = (sessionId) =>{
    getData("ip").then((ip) => {
      fetch(ip + 'charList/' + sessionId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((resJ) => {
        if(resJ.length !== 0){
          this.setState({ charList: resJ });

          getData("charString").then((charString) => {
            if(charString === undefined){
              storeData("charString", resJ[0].charString);
              this.setState({ charString: resJ[0].charString });
            }
            else{
              this.setState({ charString: charString });
            }
          });
        }
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,

    paddingTop: 5,
    paddingBottom: 5,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18
  }
});