'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

type Props = {};


export default class SpellList extends Component<Props>{
  static navigationOptions = ({navigation}) => {
    return{
      title: navigation.getParam('title')
    }
  };

  constructor(props){
    super(props);

    this.state = {
      spellList: [],
      search: "",

      isLoading: false
    }
  }

  componentDidMount(){
    this.setState({isLoading: true});

    this._getSpellList(this.props.navigation.state.params.url);
  }

  _inspectSpell = (id) => {
    let spell = this.state.spellList[this._findArrIndex(id)];
    this.props.navigation.navigate('SpellSpecific', { spell: spell });
  };

  render(){
    if(this.state.isLoading){
      // TODO: Center indivator to center of screen
      return (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
         <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return(
      <ScrollView style={{padding: 10, backgroundColor: '#ededed'}}>

        {/* Search Field */}
        <View style={styles.searchField}>
          <Image source={require('../resources/icons/search.png')} style={[styles.searchImage, {marginRight: 10}]} />
          <TextInput style={{flex: 1, fontSize: 18}} placeholder="Search.." onChange={(e) => this._filterSpells(e.nativeEvent.text)} value={this.state.search} />
          <TouchableOpacity onPress={() => this._clearFilter()}>
            <Image source={require('../resources/icons/clear.png')} style={styles.searchImage} />        
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{flex: 3, marginRight: 5, paddingLeft: 15, fontSize: 18, paddingLeft: 5}}>Name</Text>
          <Text style={{flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center', fontSize: 18}}>Range</Text>
          <Text style={{flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center', fontSize: 18}}>Casting Time</Text>
          <Text style={{flex: 1, marginLeft: 5, textAlign: 'center', fontSize: 18}}>Save</Text>          
        </View>

        {
          this.state.spellList.map(s => ( this._renderElement(s) ))
        }

      </ScrollView>
    );
  }

  _renderElement = (s) => {
    if(s.show){
      return (
        <TouchableOpacity key={s.id} style={styles.container} onPress={() => this._inspectSpell(s.id)}>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={[styles.text, {flex: 3, marginRight: 5, paddingLeft: 5}]}>{s.name}</Text>
            <Text style={[styles.text, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>{s.range}</Text>
            <Text style={[styles.text, {flex: 1, marginLeft: 5, marginRight: 5, textAlign: 'center'}]}>{s.castingTime}</Text>
            <Text style={[styles.text, {flex: 1, marginLeft: 5, textAlign: 'center'}]}>{s.save}</Text>          
          </View>
          <Text style={[styles.text, {flex: 1, paddingLeft: 5}]}>{s.desc}</Text>
        </TouchableOpacity>
      )
    }
  }

  // Filter Functions

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

  // Data fetching

  _getSpellList = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => res.json())
    .then((resJ) => {
      var spellList = resJ;

      for(let i = 0; i < spellList.length; i++){
        spellList[i].show = true;
      }
      this.setState({ spellList: spellList, isLoading: false });
    });
  }



  // Helper Functions

  _findArrIndex = (id) => {
    for(let i = 0; i < this.state.spellList.length; i++){
      if(this.state.spellList[i].id == id){
        return i;
      }
    }
    return -1;
  };


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
    borderColor: '#a8b0bd'
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