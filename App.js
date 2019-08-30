'use strict';

import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import Converter from './src/classes/converter';
import Tracker from './src/classes/tracker';

import Home from './src/classes/home';
import Character from './src/classes/character';
import SpellList from './src/classes/spellList';
import SpellSpecific from './src/classes/spellSpecific';

import Login from './src/classes/user/login';
import Register from './src/classes/user/register';

const RootStack = createStackNavigator({
  Home: { screen: Home },
  SpellList: { screen: SpellList},
  Converter: { screen: Converter },
  Tracker: { screen: Tracker },
  SpellSpecific: { screen: SpellSpecific },
  Character: { screen: Character },

  Login: { screen: Login },
  Register: { screen: Register }
});

const App = createAppContainer(RootStack);

export default App;