'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  TouchableOpacity
} from 'react-native';
import { storeData, getData } from '../../services/asyStorage';

import CustomInput from '../../components/textInput';

type Props = {};

export default class NewChar extends Component<Props>{
  static navigationOptions = {
    title: 'Create new Character',
  };

  constructor(props){
    super(props);
    
    this.state = {
      page: 1,

      alignments: [],
      backgrounds: [],

      firstname: "",
      lastname: "",
      level: undefined,
      xp: undefined,

      background: undefined,
      alignment: undefined,
      age: undefined,
      height: undefined,
      weight: undefined,

      maxHealth: undefined,
      tempHealth: undefined,
      currentHealth: undefined,

      copper: undefined,
      silver: undefined,
      electrum: undefined,
      gold: undefined,
      platinum: undefined,


    };
  }

  componentDidMount(){
    this._getAlignments();
    this._getBackgrounds();
  }

  _switchPage = (value) => {
    if(value > 0 && value < 5){
      this.setState({ page: value });
    }
  }

  render(){
    return(
      <View>
        { this._renderPage() }

        { this._showButtons() }
      </View>
    )
  }

  _showButtons = () => {
    if(this.state.page === 1){
      return(
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2}}></View>
          <TouchableOpacity style={styles.button} onPress={()=> this._switchPage(this.state.page + 1)}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if(this.state.page === 4){
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={() => this._switchPage(this.state.page - 1)}>
            <Text>Back</Text>
          </TouchableOpacity>

          <View style={{flex:1}}></View>

          <TouchableOpacity style={styles.button} onPress={()=> this._postCharacter()}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return(
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={() => this._switchPage(this.state.page - 1)}>
            <Text>Back</Text>
          </TouchableOpacity>

          <View style={{flex: 1}}></View>

          <TouchableOpacity style={styles.button} onPress={()=> this._switchPage(this.state.page + 1)}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  _renderPage = () => {
    switch(this.state.page){
      case 1:
        return(
          <View>
            <CustomInput style={styles.input} placeholder="Firstname" onChange={(e) => this.setState({ firstname: e.nativeEvent.text })} value={this.state.firstname} />
            <CustomInput style={styles.input} placeholder="Lastname" onChange={(e) => this.setState({ lastname: e.nativeEvent.text })} value={this.state.lastname} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Level" onChange={(e) => this.setState({ level: e.nativeEvent.text })} value={this.state.level} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="XP" onChange={(e) => this.setState({ xp: e.nativeEvent.text })} value={this.state.xp} />  
          </View>
        )
      
      case 2:
        return(
          <View>
            <Picker style={{marginRight: 40}} onValueChange={(value) => this.setState({alignment: value})} selectedValue={this.state.alignment}>
              { this.state.alignments.map(a => <Picker.Item key={a.id} label={a.name} value={a.id} />) }
            </Picker>
            <Picker style={{marginRight: 40}} onValueChange={(value) => this.setState({background: value})} selectedValue={this.state.background}>
              { this.state.backgrounds.map(b => <Picker.Item key={b.id} label={b.name} value={b.id} />) }
            </Picker>
            {/* <CustomInput style={styles.input} placeholder="Background" onChange={(e) => this.setState({ background: e.nativeEvent.text })} value={this.state.background} /> */}
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Age" onChange={(e) => this.setState({ age: e.nativeEvent.text })} value={this.state.age} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Height" onChange={(e) => this.setState({ height: e.nativeEvent.text })} value={this.state.height} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Weight" onChange={(e) => this.setState({ weight: e.nativeEvent.text })} value={this.state.weight} />  
          </View>
        )
      
      case 3:
        return(
          <View>
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Maximum HP" onChange={(e) => this.setState({ maxHealth: e.nativeEvent.text })} value={this.state.maxHealth} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Temporary HP" onChange={(e) => this.setState({ tempHealth: e.nativeEvent.text })} value={this.state.tempHealth} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Current HP" onChange={(e) => this.setState({ currentHealth: e.nativeEvent.text })} value={this.state.currentHealth} />  
          </View>
        )
      
      case 4:
        return(
          <View>
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Copper" onChange={(e) => this.setState({ copper: e.nativeEvent.text })} value={this.state.copper} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Silver" onChange={(e) => this.setState({ silver: e.nativeEvent.text })} value={this.state.silver} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Electrum" onChange={(e) => this.setState({ electrum: e.nativeEvent.text })} value={this.state.electrum} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Gold" onChange={(e) => this.setState({ gold: e.nativeEvent.text })} value={this.state.gold} />
            <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Platinum" onChange={(e) => this.setState({ platinum: e.nativeEvent.text })} value={this.state.platinum} />  
          </View>
        )
    }
  }

  // Data fetching
  _getAlignments = () => {
    getData("ip").then((ip) => {
      fetch(ip + "alignments", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((resJ) => this.setState({ alignments: resJ.data, alignment: resJ.data[0]["id"] }));
    });
  }
  
  _getBackgrounds = () => {
    getData("ip").then((ip) => {
      fetch(ip + "backgrounds", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((res) => res.json())
      .then((resJ) => this.setState({ backgrounds: resJ.data, background: resJ.data[0]["id"] }));
    });
  }

  _postCharacter = () => {
    if(this._checkValues()){
      getData("ip").then((ip) => {
        getData("sessionId").then((sessionId) => {
          fetch(ip + "userChar/" + sessionId, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              firstname: this.state.firstname,
              lastname: this.state.lastname,
              level: this.state.level,
              xp: this.state.xp,
              
              background: this.state.background,
              alignment: this.state.alignment,
              age: this.state.age,
              height: this.state.height,
              weight: this.state.weight,
              
              maxHealth: this.state.maxHealth,
              tempHealth: this.state.tempHealth,
              currentHealth: this.state.currentHealth,

              copper: this.state.copper,
              silver: this.state.silver,
              electrum: this.state.electrum,
              gold: this.state.gold,
              platinum: this.state.platinum
            })
          })
          .then((res) => res.json())
          .then((resJ) => {
            storeData("charString", resJ.data.charString);
            this.props.navigation.navigate("Home");
          });
        });
      });
    }
  }

  _checkValues = () => {
    if(this.state.firstname === "" && this.state.lastname === "") return false;
    else{
      if(this.state.xp === undefined) this.setState({ xp: "0" });
      if(this.state.level === undefined) this.setState({ level: "1" });
      
      if(this.state.maxHealth === undefined) this.setState({ maxHealth: "0" });
      if(this.state.tempHealth === undefined) this.setState({ tempHealth: "0" });
      if(this.state.currentHealth === undefined) this.setState({ currentHealth: "0" });

      if(this.state.age === undefined) this.setState({ age: "0" });
      if(this.state.height === undefined) this.setState({ height: "0" });
      if(this.state.weight === undefined) this.setState({ weight: "0" });

      if(this.state.copper === undefined) this.setState({ copper: "0" });
      if(this.state.silver === undefined) this.setState({ silver: "0" });
      if(this.state.electrum === undefined) this.setState({ electrum: "0" });
      if(this.state.gold === undefined) this.setState({ gold: "0" });
      if(this.state.platinum === undefined) this.setState({ platinum: "0" });
 
      return true;
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
    flex: 1
  },
  input: {
    marginBottom: 10,
    paddingLeft: 10,
    marginRight: 40,
    fontSize: 18
  }
});