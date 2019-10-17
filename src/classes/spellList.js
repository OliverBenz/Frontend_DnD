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

import Search from '../components/search';
import NavButtons from '../components/navButtons';
import { getData } from '../services/asyStorage';

export default class SpellList extends Component{
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

      isLoading: false
    }
  }

  componentDidMount(){
    this.setState({isLoading: true});
    this._getSpellList(1, undefined);
    this._getPages(this.state.spellsPerPage);
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
        <Search value={this.state.search} placeholder="Search..." onChange={(e) => this.setState({search: e})} onClear={() => this._clearFilter()} onConfirm={() => this._getSpellList(1, this.state.search)} />

        { this.state.spellList.map(s => ( this._renderElement(s) )) }

        <NavButtons pages={this.state.pages} onPageChange={(p) => {this._getSpellList(p, undefined)}} />
      </ScrollView>
    );
  }

  _renderElement = (s) => {
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

  _clearFilter = () => {
    this.setState({ search: "" });
    this._getSpellList(1, undefined);
  }

  // Data fetching
  _getSpellList = async (page, search) => {
    let url = `${this.props.navigation.state.params.url}/${(page-1) * this.state.spellsPerPage}/${this.state.spellsPerPage}`;
    if(search !== undefined) url += `/${search}`;

    const authKey = await getData("authKey");
    const header = authKey === undefined ? {'Content-Type': 'application/json'} : {'Content-Type': 'application/json', 'Authorization': `Basic ${authKey}`};

    fetch(url, {
      method: 'GET',
      headers: header
    })
    .then((res) => res.json())
    .then((resJ) => {
      if(resJ.success){
        this.setState({ spellList: resJ.data });
        if(this.state.isLoading === true) this.setState({ isLoading: false });
      }
    });
  }

  _getPages = async (spellsPerPage) => {
    let url = this.props.navigation.state.params.url.replace("spells", "spellCount");
    const authKey = await getData("authKey");
    const header = authKey === undefined ? {'Content-Type': 'application/json'} : {'Content-Type': 'application/json', 'Authorization': `Basic ${authKey}`};

    fetch(url, {
      method: 'GET',
      headers: header
    })
    .then((res) => res.json())
    .then((resJ) => {
      if(resJ.success){
        let pages = resJ.data / spellsPerPage;
        this.setState({ pages });
      }
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
    flex: 1
  }
});