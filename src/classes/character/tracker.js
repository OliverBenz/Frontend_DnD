'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import CustomInput from '../../components/textInput';
import { Counter, CounterWM } from '../../components/counter';
import AddNew from '../../components/addnew';

import { getMultiple } from '../../services/asyStorage';

type Props = {};

export default class Tracker extends Component<Props>{
  static navigationOptions = {
    title: 'Tracker',
  };

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,

      showNew: false,
      newTitle: "",
      newMax: "",
      newMin: "",
      newVal: "",

      trackers : [],
    };
  }

  componentWillUnmount(){
    let trackers = this.state.trackers;

    trackers.map(t => this._checkUnmount(t));
  }

  _checkUnmount = (t) => {
    if(t.title === "DELETE") this._delTracker(t.id);
    else this._updateTracker(t);
  }

  componentDidMount(){
    this.setState({ isLoading: true });

    this._getTrackers();
  }

  render(){
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
    if(t.maxValue !== 0){
      return(
        <View key={t.id}>
          <CounterWM title={t.title} value={t.value} min={t.minValue} max={t.maxValue} onTitleChange={(e) => this._changeTracker(t.id, e, "title")} onChange={(e) => alert(e)} callback={(e) => this._changeTracker(t.id, e, "value")} />
        </View>
      );      
    }
    else{
      return(
        <View key={t.id}>
          <Counter title={t.title} value={t.value} min={t.minValue} max={t.maxValue} onTitleChange={(e) => this._changeTracker(t.id, e, "title")} onChange={(e) => alert(e)} callback={(e) => this._changeTracker(t.id, e, "value")} />
        </View>
      );
    }
  }

  _changeTracker= (id, val, type) => {
    let trackers = this.state.trackers;
    if(type === "title") trackers[trackers.findIndex(t => t.id === id)].title = val;
    if(type === "value") trackers[trackers.findIndex(t => t.id === id)].value = val;

    this.setState({ trackers });
  }

  // Data fetching
  _getTrackers = async () => {
    const { ip, authKey, charString } = await getMultiple(["ip", "authKey", "charString"]);

    fetch(`${ip}/character/trackers/${charString}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({ trackers: resJ.data, isLoading: false });
    });
  }

  _postTracker = async () => {
    const { ip, authKey, charString } = await getMultiple(["ip", "authKey", "charString"]);

    fetch(`${ip}/character/trackers/${charString}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
      body: JSON.stringify({
        "title": this.state.newTitle,
        "trackMin": this.state.newMin,
        "trackMax": this.state.newMax,
        "trackValue": this.state.newVal
      }),
    })
    .then((res) => res.json())
    .then((resJ) => {
      this.setState({ newTitle: "", newMin: undefined, newMax: undefined, newVal: undefined, showNew: false });
      this._getTrackers();
    });
  }

  _updateTracker = async (t) => {
    const { ip, authKey, charString } = await getMultiple(["ip", "authKey", "charString"]);

    fetch(`${ip}/character/trackers/${charString}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
      body: JSON.stringify({
        "id": t.id,
        "trackTitle": t.title,
        "trackValue": t.value
      })
    })
    .then((res) => res.json())
    .then((resJ) => {}); 
  }

  _delTracker = async (id) => {
    const { ip, authKey, charString } = await getMultiple(["ip", "authKey", "charString"]);

    fetch(`${ip}/character/trackers/${charString}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      }
    })
    .then((res) => res.json())
    .then((resJ) => {}
    )
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