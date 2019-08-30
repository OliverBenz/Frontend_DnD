'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
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

  render(){
    const { params } = this.props.navigation.state;
    // alert(params);

    return(
      <View>
        {/* List of chars */}
        <View>

          { params.charList.map(c => ( this._renderChars(c) )) }

          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', margin: 10}} onPress={() => this.props.navigation.navigate("NewChar")}>
            <Image source={require('../../resources/icons/add.png')} style={{marginRight: 10}} />
            <Text style={styles.text}>Add new character</Text>
          </TouchableOpacity>
        </View>
      </View>
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
          <TouchableOpacity style={styles.button}>
            <Text>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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