'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import CustomInput from '../components/textInput';
import Counter from '../components/counter';
import AddNew from '../components/addnew';
import { getData } from '../services/asyStorage';

type Props = {};

export default class Tracker extends Component<Props>{
  static navigationOptions = {
    title: 'Tracker',
  };

  constructor(props){
    super(props);
    this.state = {
      showNew: false,
      newTitle: "",
      newMax: "",
      newMin: "",
      newVal: "",

      trackers : [
        {
          "id": 0,
          "title": "Lucky",
          "minValue": 0,
          "maxValue": 3,
          "value": 0
        },
      ],
    };
  }

  render(){
    // TODO: Lucky feat tracker
    // TODO: Spell slot tracker
    // TODO: Hit Dice tracker
    // TODO: 
    return(
      <View>
        <AddNew title={"Add new Tracker"} callback={() => this.setState({ showNew: !this.state.showNew })} />

        { this._renderNew() }

        { this.state.trackers.map(t => this._renderTrackers(t)) }

      </View>
    )
  }
  // Form for new Tracker
  _renderNew = () => {
    if(this.state.showNew){
      return(
        <View>
          <CustomInput style={styles.input} placeholder="Name" onChange={(e) => this.setState({ newTitle: e.nativeEvent.text })} value={this.state.newTitle} />

          <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Min Value" onChange={(e) => this.setState({ newMin: e.nativeEvent.text })} value={this.state.newMin} />
          <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Max Value" onChange={(e) => this.setState({ newMax: e.nativeEvent.text })} value={this.state.newMax} />

          <CustomInput style={styles.input} keyboardType={'numeric'} placeholder="Current Value" onChange={(e) => this.setState({ newVal: e.nativeEvent.text })} value={this.state.newVal} />
          <TouchableOpacity style={styles.button} onPress={() => this._postTracker()}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  // Tracker functions

  _renderTrackers = (t) => {
    return(
      <View key={t.id}>
        <Text style={{fontSize: 20}} >{t.title}</Text>
        {/* callback={(e) => this.setState({ trackers[].value: e })} */}
        <Counter value={t.value} min={t.minValue} max={t.maxValue}  onChange={(e) => alert(e)} callback={(e) => this._changeTracker(t.id, e)} />
      </View>
    )
  }
  _changeTracker= (id, val) => {
    let trackers = this.state.trackers;
    trackers[trackers.findIndex(t => t.id === id)].value = val;
    this.setState({ trackers });
  }

  // Data fetching
  _getTrackers = () => {
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + "trackers/" + sessionId + "/" + charString, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => res.json)
          .then((resJ) => {
            alert(resJ);
          })
       });
      });
    });
  }

  _postTracker = () => {
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + "trackers/" + sessionId + "/" + charString, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "title": this.state.newTitle,
              "minValue": this.state.newMin,
              "maxValue": this.state.newMax,
              "value": this.state.newVal
            }),
          })
          .then((res) => res.json)
          .then((resJ) => {
            alert(resJ)
            this.setState({ newTitle: "", newMin: undefined, newMax: undefined, newVal: undefined, showNew: false });
          });
        });
      });
    });
  }

}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingLeft: 10,
    marginRight: 40,
    fontSize: 18
  },
  button: {
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    margin: 10,
  },
});