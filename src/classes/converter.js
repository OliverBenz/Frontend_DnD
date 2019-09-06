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

type Props = {};


export default class Converter extends Component<Props>{
  static navigationOptions = {
    title: 'Converter',
  };

  constructor(props){
    super(props);
    this.state = {
      meter: "",
      yard: "",
      result: 0,
      resType: "Meters",
    }
  }

  _updateMeter = (meter) => {
    if(meter != ""){
      let y = (parseInt(meter) * 1.0936).toFixed(2);
      this.setState({result: y, resType: "Yards", meter: meter});
    }else{
      this.setState({meter: meter});
    }
  };

  _updateYard = (yard) => {
    if(yard != ""){
      let m = (parseInt(yard) / 1.0936).toFixed(2);
      this.setState({result: m, resType: "Meters", yard: yard});  
    }else{
      this.setState({yard: yard});
    }
  };

  _reset = () => {
    this.setState({meter: "", yard: "", result: 0, resType: "Meters"});
  }

  render(){
    return(
      <View style={[styles.container, {flexDirection: 'column'}]}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 50}}>
          <Text style={[styles.text, {flex: 2}]}>Meter: </Text>
          <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={[styles.text, {flex: 4, marginRight: 5}]} onChange={(e) => this._updateMeter(e.nativeEvent.text)} placeholder="1" value={this.state.meter} />
          
          <Text style={[styles.text, {flex: 2}]}>Yards: </Text>
          <TextInput keyboardType={'numeric'} underlineColorAndroid={'transparent'} style={[styles.text, {flex: 4, marginLeft: 5}]} onChange={(e) => this._updateYard(e.nativeEvent.text)} placeholder="1.0936" value={this.state.yard} />   
        </View>
        
        <Text style={styles.text}>Result: {this.state.result} {this.state.resType}</Text>
        <TouchableOpacity style={styles.button} onPress={() => this._reset()}>
          <Text style={styles.text}>Reset</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  text: {
    fontSize: 18
  },
  button: {
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    margin: 10,
    marginTop: 30
  },
});