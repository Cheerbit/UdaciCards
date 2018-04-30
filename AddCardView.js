import React, { Component } from 'react';
import {
  Button,
  ListView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import DeckManager from './DeckManager';

export default class AddCardView extends Component {
  constructor(props) {
    super(props);
    this.state = { question: '', answer: '' };
  }

  componentDidMount() {
    (async () => {
      const { params } = this.props.navigation.state;
      const deck = await DeckManager.getDeck(params.deckTitle);
      this.setState({ deck });
    })();
  }

  onButtonPress = async () => {
    const { params } = this.props.navigation.state;
    const { deck, question, answer } = this.state;
    deck.questions.push({ question, answer });
    await DeckManager.addCardToDeck(params.deckTitle, deck);
    this.setState({ question: '', answer: '' });
  };

  render() {
    return (
      <View style={ styles.container }>
        <TextInput
          style={ styles.textInput }
          placeholder={ 'What is your question?' }
          placeholderTextColor='gray'
          onChangeText={ text => this.setState({ question: text }) }
          value={ this.state.question }
        />
        <TextInput
          style={ styles.textInput }
          placeholder={ 'What is your answer?' }
          placeholderTextColor='gray'
          onChangeText={ text => this.setState({ answer: text }) }
          value={ this.state.answer }
        />
        <Button
          onPress={ this.onButtonPress }
          title='Submit'
          color='black'
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
  textInput: {
    marginTop: 20,
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
});
