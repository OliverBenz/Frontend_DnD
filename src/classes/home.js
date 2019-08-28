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
      charList: [],

      charString: "",

      loggedIn: true
    }
  }

  componentDidMount(){
    this._checkLogged();
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
    if(this.state.loggedIn === true){
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
          
          <TouchableOpacity onPress={() => {}} style={styles.button}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  _logout = () => {
    remData("sessionId").then(() => {
      this._checkLogged();
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

  render(){
    return(
      <View style={{marginTop: 10}}>
        {/* Character Heading */}
        <View style={styles.container}>
          <Picker style={{height: 50, flex: 1}} onValueChange={(itemValue) => this._valueChange(itemValue)} selectedValue={this.state.charString}>
            { this.state.charList.map(c => (this._renderCharList(c))) }
          </Picker>
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.navigate('Converter')} style={styles.button}>
          <Text style={styles.text}>Converter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SpellList', { title: "Spell List", url: "http://benz-prints.com:3004/dnd/getSpells" })} style={styles.button}>
          <Text style={styles.text}>Spell List</Text>
        </TouchableOpacity>

        { this._showButtons() }
      </View>
    );
  }

  // Data fetching

  _getCharList = (sessionId) =>{
    fetch('http://benz-prints.com:3004/dnd/charList/' + sessionId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
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
    });
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,

    paddingTop: 10,
    paddingBottom: 10,

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