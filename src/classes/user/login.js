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
import { storeData, getData } from '../../services/asyStorage';

import CustomInput from '../../components/textInput';

type Props = {};

export default class Login extends Component<Props>{
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props){
    super(props);
    
    this.state = {
      email: "",
      password: ""
    };

  }

  render(){
    return(
      <View>
        <CustomInput style={{marginTop: 10, marginBottom: 10}} onChange={(e) => this.setState({ email: e.nativeEvent.text })} value={this.state.email} placeholder="E-Mail" />
        <CustomInput style={{marginTop: 10, marginBottom: 10}} onChange={(e) => this.setState({ password: e.nativeEvent.text })} value={this.state.password} placeholder="Password" secureTextEntry={true} />
        
        <TouchableOpacity style={styles.button} onPress={() => this._postBackend()}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Data fetching
  _postBackend = async () => {
    if(this.state.email != "" && this.state.password != ""){
      const ip = await getData("ip");

      fetch(`${ip}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        }),
      })
      .then((res) => res.json())
      .then((resJ) => {
        storeData("authKey", resJ.data);
        
        this.props.navigation.navigate('Home');
      });

    }
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
});