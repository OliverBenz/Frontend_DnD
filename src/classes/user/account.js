'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  Button
} from 'react-native';
import { storeData, getData } from '../../services/asyStorage';

type Props = {};

export default class Account extends Component<Props>{
  static navigationOptions = {
    title: 'Account',
  };

  constructor(props){
    super(props);

    this.state = {
      charList: []
    }
  }

  componentDidMount(){
    this.setState({charList: this.props.navigation.state.params.charList});
  }

  _deleteChar = (charString) => {
    // TODO: Function that checks if the user really wants to delete
    // User has to imput password
    if(false){
      this._delCharAPI(charString);

      // Delete char from charList
      let charList = this.state.charList;
      for(let i = 0; i < charList.length; i++){
        if(charList[i]["charString"] == charString){
          charList.splice(i, 1);
          this.setState({ charList });
          break;
        }
      }
    }
    
    // Delete char from charList
  }
  _editChar = (charString) => {
    alert(charString);
  }

  render(){
    return(
      <ScrollView>
        {/* List of chars */}
        <View>

          { this.state.charList.map(c => ( this._renderChars(c) )) }

          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', margin: 10}} onPress={() => this.props.navigation.navigate("NewChar")}>
            <Image source={require('../../resources/icons/add.png')} style={{marginRight: 10}} />
            <Text style={styles.text}>Add new character</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  // Render function
  _renderChars = (c) => {
    return(
      <View key={c.charString} style={{flexDirection: 'row', alignItems: 'center', margin: 10, borderWidth: 1}} >
        <View style={{flexDirection: 'row', flex: 1, paddingLeft: 10}}>
          <Text style={styles.text}>{ c.firstname } { c.lastname } </Text>
        </View>

        <View styles={{flexDirection: 'column'}}>
          <TouchableOpacity style={styles.button} onPress={() => this._deleteChar(c.charString)}>
            <Text>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => this._editChar(c.charString)}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Data fetching

  _delCharAPI = (charString) => {
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        fetch(ip + "userChar/" + sessionId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "charString": charString
          })
        });
      });
    });
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    // marginTop: 10,
    // marginBottom: 10,
  },
});