'use strict';

import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

export default function AddNew(props){
  return (
    <View>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', margin: 10}} onPress={() => props.callback()}>
        <Image source={require('../resources/icons/add.png')} style={{marginRight: 10}} />
        <Text style={{ fontSize: 18 }}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}