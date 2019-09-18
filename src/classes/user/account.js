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
import CustomInput from '../../components/textInput';
import AddNew from '../../components/addnew';

type Props = {};

export default class Account extends Component<Props>{
  static navigationOptions = {
    title: 'Account',
  };

  constructor(props){
    super(props);

    this.state = {
      password: "",
      charList: []
    }
  }

  componentDidMount(){
    let charList = this.props.navigation.state.params.charList;

    for(let i = 0; i < charList.length; i++){
      charList[i]["del"] = false;
    }
    this.setState({charList: this.props.navigation.state.params.charList});
  }

  // Show or hide password input field
  _delSwitch = (charString) => {
    let charList = this.state.charList;
    for(let i = 0; i < charList.length; i++){
      if(charList[i]["charString"] === charString){
        charList[i]["del"] = !charList[i]["del"];
        this.setState({ charList: charList });
        break;
      }
    }
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

          <AddNew title={"Add new Character"} callback={() => this.props.navigation.navigate("NewChar")} />
        </View>
      </ScrollView>
    );
  }

  // Render function
  _renderChars = (c) => {
    // Render an input field for password if delete is true
    if(c["del"]){
      // TODO: Update design
      // TODO: Implement functionality
      return(
        // Container
        <View style={styles.container} key={c.charString}>
          {/* Row 1 */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text style={styles.text} >{ c.firstname } { c.lastname }</Text>
            </View>

            <View>
              <TouchableOpacity style={styles.button} onPress={() => this._delSwitch(c.charString)}>
                <Text>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => this._editChar(c.charString)}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Row 2 */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <CustomInput onChange={(e) => this.setState({ password: e.nativeEvent.text })} value={this.state.password} placeholder="Enter password to confirm" secureTextEntry={true} />
            </View>

            <View>
              <TouchableOpacity onPress={() => this._delCharAPI(c.charString, this.state.password)} style={[styles.button, {marginLeft: 10}]}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    }
    else{
      return(
        <View key={c.charString} style={[styles.container, {flexDirection: 'row', alignItems: 'center'}]} >
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={styles.text}>{ c.firstname } { c.lastname } </Text>
          </View>

          <View styles={{flexDirection: 'column'}}>
            <TouchableOpacity style={styles.button} onPress={() => this._delSwitch(c.charString)}>
              <Text>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this._editChar(c.charString)}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

  }

  // Data fetching

  _delCharAPI = (charString, password) => {
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        fetch(ip + "userChar/" + sessionId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "charString": charString,
            "password": password
          })
        })
        .then((res) => res.json())
        .then((resJ) => {
          if(resJ["result"]){
            // Remove character from charList
            let charList = this.state.charList;
            for(let i = 0; i < charList.length; i++){
              if(charList[i]["charString"] == charString){
                charList.splice(i, 1);
                this.setState({ charList: charList, password: "" });
                break;
              }
            }
          }
          else{
            alert(resJ["message"]);
          }
        });
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10
  },
  text: {
    fontSize: 18
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 75,
    // marginTop: 10,
    // marginBottom: 10,
  },
});