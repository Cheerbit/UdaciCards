import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import AddCardView from './AddCardView';
import AddDeckView from './AddDeckView';
import DeckListView from './DeckListView';
import DeckView from './DeckView';
import QuizView from './QuizView';
import { createNotif } from './notificationUtils'

const DeckStack = StackNavigator({
  DeckList: {
    screen: DeckListView,
  },
  Deck: {
    screen: DeckView,
  },
  AddCard: {
    screen: AddCardView,
  },
  Quiz: {
    screen: QuizView,
  },
});

const Tabs = TabNavigator({
  DeckStack: {
    screen: DeckStack,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='archive' size= { 30 } color={ tintColor } />,
    },
  },
  AddDeck: {
    screen: AddDeckView,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='ban' size={30} color={ tintColor } />,
    },
  },
});

export default class App extends React.Component {
  componentDidMount() {
    createNotif();
  }

  render() {
    return (
      <Tabs />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
