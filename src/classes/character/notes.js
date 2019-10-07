'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';
import { getData } from '../../services/asyStorage';
import AddNew from '../../components/addnew';
import Search from '../../components/search';

type Props = {};

export default class Notes extends Component<Props>{
  constructor(props){
    super(props);

    this.state = {
      notes : [],
      search: "",

      isLoading: false
    }
  }

  componentDidMount(){
    this._fetchNotes();
  }

  componentWillUnmount(){
    let notes = this.state.notes;

    for(let i = 0; i < notes.length; i++){
      if(notes[i].note === ""){
        this._delNote(notes[i].id);
      }
    }
  }

  render(){
    if (this.state.isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return(
      // ScrollView has to be wrapped with flex: 1 so it doesn't cut off
      <View style={{flex: 1}}>
        <Search value={this.state.search} placeholder="Search..." onChange={(e) => this._filterNotes(e)} onConfirm={() => {}} onClear={() => this._clearFilter()} />

        <ScrollView>
          <AddNew title={"New Note"} callback={() => this._postNote()} />

          { this.state.notes.map(n => this._renderNotes(n)) }        
        </ScrollView>
      </View>
    )
  }

  _renderNotes = (n) => {
    if(n.show){
      return(
        <Card key={n.id} title={n.date}>
          <TextInput placeholder="..." value={this._getValue(n.id)} onChange={(e) => this._setValue(e.nativeEvent.text, n.id)} multiline={true} />
          <TouchableOpacity onPress={() => this._updateNote(n.id)}>
            <Text>Save</Text>
          </TouchableOpacity>
        </Card>
      )
    }
  }

  // Note Values
  _getValue = (id) => {
    return this.state.notes[this.state.notes.findIndex(x => x.id === id)].note;
  }
  _setValue = (value, id) => {
    let notes = this.state.notes;
    notes[this.state.notes.findIndex(x => x.id === id)].note = value;
    this.setState({notes});
  }

  // Filter Functions
  _filterNotes = (filter) => {
    this.setState({search: filter});

    let notes = this.state.notes;
    for(let i = 0; i < notes.length; i++){
      if (! notes[i].note.toUpperCase().includes(filter.toUpperCase())){
        notes[i].show = false;
      }
      else{
        notes[i].show = true;
      }
    }
    this.setState({notes: notes});
  };
  
  _clearFilter = () => {
    let notes = this.state.notes;

    for(let i = 0; i < notes.length; i++){
      notes[i].show = true;
    }

    this.setState({notes: notes, search: ""});
  }

  // Data fetching
  _fetchNotes = async () => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

    fetch(`${ip}/character/notes/${charString}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      if(resJ.data.length > 0){
        for(let i = 0; i < resJ.data.length; i++){
          let dateSplit = resJ.data[i].date.split("T")[0].split("-");
          resJ.data[i].date = dateSplit[2] + "." + dateSplit[1] + "." + dateSplit[0];
          resJ.data[i].show = true;
        }
      }
      this.setState({ notes: resJ.data });
    });
  }

  _updateNote = async (id) => {
    const note = this.state.notes[this.state.notes.findIndex(x => x.id === id)];

    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

    fetch(`${ip}/character/notes/${charString}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
      body: JSON.stringify({
        "id": note.id,
        "note": note.note
      })
    })
    .then((res) => res.json())
    .then((resJ) => {});

  }

  _postNote = async () => {
    let today = new Date();
    today = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0') + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

    fetch(`${ip}/character/notes/${charString}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
      body: JSON.stringify({
        "date": today,
        "note": ""
      })
    })
    .then((res) => res.json())
    .then((resJ) => {
      resJ.data.show = true;
      var obj = this.state.notes;
      obj.unshift(resJ.data);
      this.setState({ notes: obj });
    });

  }

  _delNote = async (id) => {
    const ip = await getData("ip");
    const authKey = await getData("authKey");
    const charString = await getData("charString");

    fetch(`${ip}/character/notes/${charString}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authKey}`
      },
      body: JSON.stringify()
    })
    .then((res) => res.json())
    .then((resJ) => {});
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 20,
    padding: 10
  }
});