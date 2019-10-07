'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import CustomInput from '../../components/textInput';
import Counter from '../../components/counter';
import AddNew from '../../components/addnew';

import { getData } from '../../services/asyStorage';

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

    for(let i = 0; i < trackers.length; i++){
      this._updateTracker(trackers[i].id, trackers[i].value);
    }
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
  _getTrackers = async () => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

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
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

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

  _updateTracker = async (id, value) => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

    fetch(`${ip}/character/trackers/${charString}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
      body: JSON.stringify({
        "id": id,
        "trackValue": value
      })
    })
    .then((res) => res.json())
    .then((resJ) => {}); 
  }

  _delTracker = async (id) => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

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