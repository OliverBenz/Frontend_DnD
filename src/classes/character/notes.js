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
import AddNew from '../../components/addnew';
import { getData } from '../../services/asyStorage';

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
        {/* Search Field */}
        <View style={styles.searchField}>
          <Image source={require('../../resources/icons/search.png')} style={[styles.searchImage, {marginRight: 10}]} />
          <TextInput style={{flex: 1, fontSize: 18}} placeholder="Search.." onChange={(e) => this._filterNotes(e.nativeEvent.text)} value={this.state.search} />
          <TouchableOpacity onPress={() => this._clearFilter()}>
            <Image source={require('../../resources/icons/clear.png')} style={styles.searchImage} />        
          </TouchableOpacity>
        </View>

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
  _fetchNotes = () => {
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + "charNotes/" + sessionId + "/" + charString, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            }
          })
          .then((res) => res.json())
          .then((resJ) => {
            for(let i = 0; i < resJ.length; i++){
              let dateSplit = resJ[i].date.split("T")[0].split("-");
              resJ[i].date = dateSplit[2] + "." + dateSplit[1] + "." + dateSplit[0];
              resJ[i].show = true;
            }
            this.setState({ notes: resJ })
          });
        });
      });
    });
  }

  _updateNote = (id) => {
    let note = this.state.notes[this.state.notes.findIndex(x => x.id === id)];

    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + "charNotes/" + sessionId + "/" + charString, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "id": note.id,
              "note": note.note
            })
          })
          .then((res) => res.json())
          .then((resJ) => {});
        });
      });
    });
  }

  _postNote = () => {
    let today = new Date();
    today = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0') + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + "charNotes/" + sessionId + "/" + charString, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "date": today,
              "note": ""
            })
          })
          .then((res) => res.json())
          .then((resJ) => {
            resJ.show = true;
            var obj = this.state.notes;
            obj.unshift(resJ);
            this.setState({ notes: obj });
          });
        });
      });
    });
  }

  _delNote = (id) => {
    getData("ip").then((ip) => {
      getData("sessionId").then((sessionId) => {
        getData("charString").then((charString) => {
          fetch(ip + "charNotes/" + sessionId + "/" + charString, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id": id
            })
          })
          .then((res) => res.json())
          .then((resJ) => {});
        });
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    margin: 20,
    padding: 10
  },
  searchField: {
    borderWidth: 1,
    borderColor: '#a8b0bd',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10
  },
  searchImage: {
    height: 20,
    width: 20
  }
});