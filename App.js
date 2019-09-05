'use strict';

import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';

import Converter from './src/classes/converter';
import Tracker from './src/classes/tracker';

import Home from './src/classes/home';
import Character from './src/classes/character';
import Notes from './src/classes/character/notes';
import SpellList from './src/classes/spellList';
import SpellSpecific from './src/classes/spellSpecific';

import Login from './src/classes/user/login';
import Register from './src/classes/user/register';
import Account from './src/classes/user/account';
import NewChar from './src/classes/user/newChar';

const RootStack = createStackNavigator({
  Home: { screen: Home },
  SpellList: { screen: SpellList},
  Converter: { screen: Converter },
  Tracker: { screen: Tracker },
  SpellSpecific: { screen: SpellSpecific },
  Character: { screen: Character },
  Notes: { screen: Notes },

  Login: { screen: Login },
  Register: { screen: Register },
  Account: { screen: Account },
  NewChar: { screen: NewChar }
});

const App = createAppContainer(RootStack);

export default App;

// const DrawerNavigator = createDrawerNavigator(
//   {
//     Home: { screen: Home },
//     SpellList: { screen: SpellList }
//   },
//  {
//     hideStatusBar: true,
//     drawerBackgroundColor: 'rgba(255,255,255,.9)',
//     overlayColor: '#6b52ae',
//     contentOptions: {
//       activeTintColor: '#fff',
//       activeBackgroundColor: '#6b52ae',
//     },
//   }
// );

// export default createAppContainer(DrawerNavigator);