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
import { Card } from 'react-native-elements';

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

      spellsPerPage: 20,

      pages: 1,
      currentPage: 1,

      isLoading: false
    }
  }

  componentDidMount(){
    this.setState({isLoading: true});

    this._getSpellList(this.props.navigation.state.params.url);
  }

  _inspectSpell = (id) => {
    let spell = this.state.spellList[this.state.spellList.findIndex(x => x.id === id)];
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
      <ScrollView style={{flex: 1}}>
        {/* Search Field */}
        <View style={styles.searchField}>
          <Image source={require('../resources/icons/search.png')} style={[styles.searchImage, {marginRight: 10}]} />
          <TextInput style={{flex: 1, fontSize: 18}} placeholder="Search.." onChange={(e) => this._filterSpells(e.nativeEvent.text)} value={this.state.search} />
          <TouchableOpacity onPress={() => this._clearFilter()}>
            <Image source={require('../resources/icons/clear.png')} style={styles.searchImage} />        
          </TouchableOpacity>
        </View>

        { this.state.spellList.map(s => ( this._renderElement(s) )) }

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.button} onPress={()=> this._prevPage()}>
            <Text>Back</Text>
          </TouchableOpacity>

          <View style={{flex: 2}}></View>

          <TouchableOpacity style={styles.button} onPress={()=> this._nextPage()}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }

  _nextPage = () => {
    if(this.state.currentPage < this.state.pages){
      let spells = this.state.spellList;

      for(let i = 0; i < spells.length; i++){
        if(i < this.state.currentPage * this.state.spellsPerPage) spells[i].show = false;
        else if(i >= this.state.currentPage * this.state.spellsPerPage && i < (this.state.currentPage + 1) * this.state.spellsPerPage) spells[i].show = true;
      }

      this.setState({ currentPage: this.state.currentPage + 1, spellList: spells });
    }
  }

  _prevPage = () => {
    if(this.state.currentPage > 1){
      let spells = this.state.spellList;

      for(let i = 0; i < spells.length; i++){
        if(i >= (this.state.currentPage - 1) * this.state.spellsPerPage && i <= this.state.currentPage * this.state.spellsPerPage) spells[i].show = false;
        else if(i <= (this.state.currentPage - 1) * this.state.spellsPerPage && i >= (this.state.currentPage - 2) * this.state.spellsPerPage) spells[i].show = true;
      }

      this.setState({ currentPage: this.state.currentPage - 1, spellList: spells })
    }
  }

  _renderElement = (s) => {
    if(s.show){
      return (
        <TouchableOpacity key={s.id} style={{marginBottom: 10}} onPress={() => this._inspectSpell(s.id)} >
          <Card style={{flexDirection: 'row'}} title={s.name}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>Level: { s.level }</Text>
              <Text style={styles.text}>Range: { s.range }</Text>
            </View>
          </Card>
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
      if(i < this.state.spellsPerPage) spells[i].show = true;
      else spells[i].show = false;
    }

    this.setState({spellList: spells, search: "", currentPage: 1});
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
        if(i < this.state.spellsPerPage) spellList[i].show = true;
        else spellList[i].show = false;
      }

      let pages = Math.floor(spellList.length / this.state.spellsPerPage);
      this.setState({ pages: pages });

      this.setState({ spellList: spellList, isLoading: false });
    });
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    flex: 1,
    textAlign: 'center'
  },
  button: {
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    margin: 10,
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