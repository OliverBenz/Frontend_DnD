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
        <Text>E-Mail: </Text>
        <TextInput onChange={(e) => this.setState({ email: e.nativeEvent.text })} value={this.state.email} />

        <Text>Password: </Text>
        <TextInput onChange={(e) => this.setState({ password: e.nativeEvent.text })} value={this.state.password} secureTextEntry={true} />

        <TouchableOpacity style={styles.button} onPress={() => this._postBackend()}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Data fetching

  _postBackend = () => {
    if(this.state.email != "" && this.state.password != ""){
      getData("ip").then((ip) => {
        fetch(ip + 'userLogin', {
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