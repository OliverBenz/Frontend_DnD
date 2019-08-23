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

export default class General extends Component<Props>{
  constructor(props){
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      level: 0,
      xp: 0,
      alignment: "",
      background: "",
      age: 0,
      height: 0,
      weight: 0
    }

    fetch('http://benz-prints.com:3004/dnd/charGeneral/xyz/Hk6Sh1m9^aWd9NMOdKh', {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json'
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({firstname: resJ.data.firstname, lastname: resJ.data.lastname, level: resJ.data.level, xp: resJ.data.xp, alignment: resJ.data.alignment, background: resJ.data.background, age: resJ.data.age, height: resJ.data.height, weight: resJ.data.weight});
    }); 
  }

  render(){
    return(
      <View style={styles.title}>
        <Text style={styles.heading}>{this.state.firstname} {this.state.lastname} - Lvl: {this.state.level}</Text>
        <Text style={styles.heading}>XP: {this.state.xp}</Text>
        {/* <Text>{this.state.lastname}</Text> */}
      </View>

      // <View style={{marginBottom: 40, flexDirection: 'row'}}>
      //   <View style={{flexDirection: 'column'}}>
      //     <View style={styles.topRow}>
      //       <Text style={[styles.text, styles.underline]}>Firstname</Text>
      //       <Text style={styles.text}>{ this.state.firstname }</Text>
      //     </View>
          
      //     <Text style={[styles.text, styles.underline]}>Alignment</Text>
      //     <Text style={styles.text}>{ this.state.alignment }</Text>
      //   </View>
        
      //   <View style={{flexDirection: 'column'}}>
      //     <View style={styles.topRow}>
      //       <Text style={[styles.text, styles.underline]}>Lastname</Text>
      //       <Text style={styles.text}>{ this.state.lastname }</Text>
      //     </View>
          
      //     <Text style={[styles.text, styles.underline]}>Background</Text>
      //     <Text style={styles.text}>{ this.state.background }</Text>  
      //   </View>
        
      //   <View style={{flexDirection: 'column'}}>
      //     <View style={styles.topRow}>
      //       <Text style={[styles.text, styles.underline]}>Level</Text>
      //       <Text style={[styles.text, {textAlign: 'center'}]}>{ this.state.level }</Text>
      //     </View>
          
      //     <Text style={[styles.text, styles.underline]}>Age</Text>
      //     <Text style={[styles.text, {textAlign: 'center'}]}>{ this.state.age }</Text>       
      //   </View>
        
      //   <View style={{flexDirection: 'column'}}>
      //     <View style={styles.topRow}>
      //       <Text style={[styles.text, styles.underline]}>XP</Text>
      //       <Text style={[styles.text, {textAlign: 'center'}]}>{ this.state.xp }</Text>
      //     </View>
          
      //     <Text style={[styles.text, styles.underline]}>Height</Text>
      //     <Text style={[styles.text, {textAlign: 'center'}]}>{ this.state.height }</Text>    
      //   </View>
        
      //   <View style={{flexDirection: 'column'}}>
      //     <View style={styles.topRow}>
      //       <Text style={[styles.text, styles.underline]}>Weight</Text>
      //       <Text style={[styles.text, {textAlign: 'center'}]}>{ this.state.weight }</Text>          
      //     </View>
      //   </View>
      // </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  },
  heading: {
    fontSize: 24
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 40
  },
  underline: {
    textDecorationLine: 'underline'
  },
  topRow: {
    marginBottom: 20
  }
});