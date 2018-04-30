import React, { Component } from 'react';
import {
  FlatList,
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import DeckManager from './DeckManager';

export default class DeckListView extends Component {
  constructor() {
    super();
    this.state = { decks: [] };
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.viewWillFocus);
  }

  viewWillFocus = () => {
    (async () => {
      const decks = await DeckManager.getDecks();
      this.setState({ decks });
    })();
  };

  onDeckPress = deck => {
    this.props.navigation.navigate('Deck', {
      deckTitle: deck.title,
    });
  };

  render() {
    const { decks } = this.state;
    if (!decks || !decks.length) {
      return null;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={ decks }
          renderItem={({ item }) => {
            return (
              <TouchableHighlight
                onPress={ () => this.onDeckPress(item) }
                underlayColor='lightgray'
                style={ styles.itemWrapper }
                key={ item.title }
              >
                <View>
                  <Text key={ `${item.title}_1` } style={ styles.titleText }>{ item.title }</Text>
                  <Text key={ `${item.title}_2` } style={ styles.item }>{ `${item.questions.length} cards` }</Text>
                </View>
              </TouchableHighlight>
            );
          } }
        />
      </View>
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
  itemWrapper: {
    alignItems: 'center',
    flex: 1,
    width: 200,
    borderColor: 'dimgray',
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  titleText: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    height: 44,
  },
});
