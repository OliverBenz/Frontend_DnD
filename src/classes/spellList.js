'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';

type Props = {};


export default class SpellList extends Component<Props>{
  static navigationOptions = {
    title: 'Spell List',
  };

  constructor(props){
    super(props);

    this.state = {
      spellList: [],
      search: ""
    }

    fetch("http://benz-prints.com:3004/dnd/getSpells", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      var spellList = [];
      
      for(let i = 0; i < resJ.data.length; i++){
        spellList.push({
          "id": resJ.data[i].id,
          "name": resJ.data[i].name,
          "level": resJ.data[i].level,
          "range": resJ.data[i].range,
          "castingTime": resJ.data[i].castTime,
          "save": resJ.data[i].save,
          "duration": resJ.data[i].duration,
          "components": resJ.data[i].components,
          "desc": resJ.data[i].desc,
          "descLong": resJ.data[i].descLong,
          "show": true
        });
      }
      this.setState({ spellList: spellList, spellListShow: spellList });
    });
  }

  _inspectSpell = (id) => {
    let spell = this.state.spellList[this._findArrIndex(id)];
    this.props.navigation.navigate('SpellSpecific', { spell: spell });
  };

  _filterSpells = (filter) => {
    this.setState({search: filter});

    let spells = this.state.spellList; 
    for(let i = 0; i < spells.length; i++){
      // To Upper Case function needed because .includes function is case sensitive
      if (! spells[i].name.toUpperCase().includes(filter.toUpperCase())){
        spells[i].show = false;
      }
      else{
        spells[i].show = true;
      }
    }
    this.setState({spellList: spells});
  };

  _clearFilter = () => {
    let spells = this.state.spellList;
    for(let i = 0; i < spells.length; i++){
      spells[i].show = true;
    }
    this.setState({spellList: spells, search: ""});
  }

  _findArrIndex = (id) => {
    for(let i = 0; i < this.state.spellList.length; i++){
      if(this.state.spellList[i].id == id){
        return i;
      }
    }
    return -1;
  };

  _renderElement = (s) => {
    if(s.show){
      return (
        <TouchableOpacity key={s.id} style={styles.container} onPress={() => this._inspectSpell(s.id)}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={[styles.text, {flex: 3, marginRight: 5}]}>{s.name}</Text>
            <Text style={[styles.text, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>{s.range}</Text>
            <Text style={[styles.text, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>{s.castingTime}</Text>
            <Text style={[styles.text, {flex: 1, marginLeft: 5, textAlign: 'center'}]}>{s.save}</Text>          
          </View>
          <Text style={[styles.text, {flex: 1}]}>{s.desc}</Text>
        </TouchableOpacity>
      )
    }
  }

  render(){
    return(
      <ScrollView style={{padding: 10, backgroundColor: '#ededed',}}>

        {/* Search Field */}
        <View style={styles.searchField}>
          <Image source={require('../resources/icons/search.png')} style={[styles.searchImage, {marginRight: 10}]} />
          <TextInput style={{flex: 1, fontSize: 18}} placeholder="Search.." onChange={(e) => this._filterSpells(e.nativeEvent.text)} value={this.state.search} />
          <TouchableOpacity onPress={() => this._clearFilter()}>
            <Image source={require('../resources/icons/clear.png')} style={styles.searchImage} />        
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{flex: 3, marginRight: 5, paddingLeft: 15, fontSize: 18}}>Name</Text>
          <Text style={{flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center', fontSize: 18}}>Range</Text>
          <Text style={{flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center', fontSize: 18}}>Casting Time</Text>
          <Text style={{flex: 1, marginLeft: 5, textAlign: 'center', fontSize: 18}}>Save</Text>          
        </View>

        {
          this.state.spellList.map(s => (
            this._renderElement(s)
          ))
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#a8b0bd',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f7f7f7'
  },
  text: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#a8b0bd',
  },
  searchField: {
    borderWidth: 1,
    borderColor: '#a8b0bd',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  searchImage: {
    height: 20,
    width: 20
  }
});