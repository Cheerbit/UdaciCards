import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import DeckManager from './DeckManager';
import viewWithWillFocus from './viewWithWillFocus';

class DeckView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', this.viewWillFocus);
  }

  viewWillFocus = () => {
    (async () => {
      const { params } = this.props.navigation.state;
      const deck = await DeckManager.getDeck(params.deckTitle);
      this.setState({ deck });
    })();
  };

  onAddCardPress = () => {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate('AddCard', {
      deckTitle: params.deckTitle,
    });
  };

  onStartQuizPress = () => {
    const { params } = this.props.navigation.state;
    this.props.navigation.navigate('Quiz', {
      deckTitle: params.deckTitle,
    });
  };

  render() {
    const { deck } = this.state;
    if (!deck) {
      return null;
    }

    return (
      <View style={ styles.container }>
        <Text style={ styles.titleText }>{ deck.title }</Text>
        <Text>{ `${deck.questions.length} cards` }</Text>
        <Button
          onPress={ this.onAddCardPress }
          title='Add Card'
          color='black'
        />
        {
          deck.questions.length > 0 && (
            <Button
              onPress={ this.onStartQuizPress }
              title='Start Quiz'
              color='black'
            />
          ) || null
        }
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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default viewWithWillFocus(DeckView);
