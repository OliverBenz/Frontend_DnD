'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class NavButtons extends Component{

    constructor(props){
        super(props);
        this.state = {
            page: 1
        }
    }

    render(){
        return(
            <View>
                { this._renderButtons() }
            </View>        
        );
    }

    _onNextPress = () => {
        let page = this.state.page + 1;
        this.props.onPageChange(page);
        this.setState({ page });
    }

    _onBackPress = () => {
        if(this.state.page > 1){
            let page = this.state.page - 1;
            this.props.onPageChange(page);
            this.setState({ page });
        }
    }

    _renderButtons = () => {
        if(this.state.page === 1 && this.props.lastPage === false){
            return(
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}></View>
                
                    <TouchableOpacity style={styles.button} onPress={()=> this._onNextPress()}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>                
            );
        }
        if(this.state.page === 1 && this.props.lastPage === true){
            return(<View></View>);
        }
        if(this.state.page > 1 && this.props.lastPage === false){
            return(
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button} onPress={()=> this._onBackPress()}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                
                    <View style={{flex: 1}}></View>
                
                    <TouchableOpacity style={styles.button} onPress={()=> this._onNextPress()}>
                        <Text>Next</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if(this.props.lastPage === true){
            return(
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button} onPress={()=> this._onBackPress()}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                
                    <View style={{flex: 2}}></View>
                </View>
            )
        }
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