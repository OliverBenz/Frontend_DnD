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
import { storeData } from '../services/asyStorage';

type Props = {};

export default class Login extends Component<Props>{
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props){
    super(props);
    
    this.state = {
      email: "",
      password: ""
    };

  }

  _postBackend = () => {
    if(this.state.email != "" && this.state.password != ""){
      fetch('http://benz-prints.com:3004/dnd/userLogin', {
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
        storeData("sessionId", resJ["sessionId"]);
        
        this.props.navigation.navigate('Home');
      });
    }
  }



  render(){
    return(
      <View>
        <Text>E-Mail: </Text>
        <TextInput onChange={(e) => this.setState({ email: e.nativeEvent.text })} value={this.state.email} />

        <Text>Password: </Text>
        <TextInput onChange={(e) => this.setState({ password: e.nativeEvent.text })} value={this.state.password} secureTextEntry={true} />

        <TouchableOpacity onPress={() => this._postBackend()}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({

});